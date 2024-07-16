"use client";
import React, { useContext, useState, useEffect } from "react";

// Internal imports
import Style from "./AllUser.module.css";
import UserCard from "../UserCard/UserCard";
import { ChatAppContext } from "@/Context/ChatAppContext";

const AllUser = () => {
  const { addFriends, userLists } = useContext(ChatAppContext);

  return (
    <div className={Style.alluser_container}>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends..</h1>
      </div>
      <div className={Style.alluser_cards}>
        <UserCard userLists={userLists} addFriends={addFriends} />
      </div>
    </div>
  );
};

export default AllUser;
