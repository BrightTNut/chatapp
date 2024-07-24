"use client";
import Image from "next/image";
import React from "react";

// Internal imports
import Style from "./UserCard.module.css";
import images from "../../assets";

const UserCard = ({ userLists, addFriends }) => {
  return (
    <div className={Style.UserCard_container}>
      {userLists.map((userList, i) => (
        <div key={i} className={Style.UserListCard}>
          {userList.map((user, i) => (
            <div key={i} className={Style.UserCard}>
              <div className={Style.UserCard_box}>
                <Image
                  src={images[`image${i + 1}`]}
                  alt={`image-${i + 1}`}
                  width={100}
                  height={100}
                />
                <div className={Style.UserCard_box_info}>
                  <h3>Name : {user[0]}</h3>
                  <p>Address : {user[1].slice(0, 15)}..</p>
                  <button
                    onClick={() => {
                      const friendData = {
                        name: user[0],
                        accountAddress: user[1],
                      };
                      // Debug log
                      addFriends(friendData);
                    }}
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserCard;
