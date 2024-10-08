"use client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import chatappabi from "../Context/ChatApp.json";
import { ChatAppAddress } from "@/Context/constants";
import { changeNetwork } from "@/Context/constants";
const ChatAppABI = chatappabi.abi;
export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    changeNetwork();
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    // console.log("Wallet address", firstAccount);
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    changeNetwork();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    // console.log("Wallet address", firstAccount);
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();

    const connection = await web3modal.connect();
    //const provider = new ethers.Web3Provider(connection);
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.log("Error during ConnectingWithContract :", error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(Number(time));
  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    " Date: " +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
