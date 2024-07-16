"use client";
import React, { useState, useEffect, createContext, Children } from "react";
import { useRouter } from "next/navigation";

//internal import
import {
  connectWallet,
  connectingWithContract,
  CheckIfWalletConnected,
} from "../Utils/apiFeature";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const router = useRouter();

  //USE STATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRCAT
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectedAccount = await connectWallet();

      setAccount(Number(connectedAccount));
      //GET USER NAME
      const userName = await contract.getUsername(connectedAccount);

      console.log("username is :", String(userName));
      setUserName(userName);
      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      console.log(friendLists);
      setFriendLists(friendLists);
      //GET ALL APP USER LISTS
      const allUserLists = await contract.getAllAppUsers();
      console.log("User list :", allUserLists);
      setUserLists(Array(allUserLists));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async () => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage();
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You Hav no Message !!");
      console.log(error);
    }
  };

  //CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Pleaser Enter name, Also Reload Browser!!");

      const contract = await connectingWithContract();

      const getCreatedUser = await contract.createAccount(name);

      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //ADD YOUR FRIEND
  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress) return setError("Please Enter Data !!");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went Wrong While adding in Friend List !!");
      console.log(error);
    }
  };

  //SEND MESSAGES
  const sendMessage = async ({ msg, address }) => {
    try {
      if (msg || address) return setError("Please Type Your Message !!");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
    } catch (error) {
      setError("Error During Sending Message !!");
      console.log(error);
    }
  };

  //READ USER INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserAddress(userAddress);
    setCurrentUserName(userName);
  };
  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
