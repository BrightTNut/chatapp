"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import Style from "./Navbar.module.css";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Model from "../Model/Model";
import Error from "../Error/Error";
import images from "../../assets/index";

const Navbar = () => {
  const { account, userName, connectWallet, createAccount, error, address } =
    useContext(ChatAppContext);

  //MENU LIST
  const menuItems = [
    {
      menu: "All Users",
      link: "allusers",
    },
    {
      menu: "CHAT",
      link: "Chat",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];
  //USE STATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Nabar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt="Logo" width={50} height={50} priority />
        </div>
        <div className={Style.Navbar_box_right}>
          {/* DESKTOP */}

          <div className={Style.Navbar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i}
                className={`${Style.Navbar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  href={el.link}
                  className={Style.Navbar_box_right_menu_items_link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link href={el.link} className={Style.mobile_menu_items_link}>
                    {el.menu}
                  </Link>
                </div>
              ))}

              <p className={Style.mobile_menu_btn_close}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
        </div>
        {/* CONNECT WALLET */}
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}Connect Wallet
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)} className="flex">
                {""}
                <h1>{userName || "Create Account"} </h1>
              </button>
            )}
          </div>
          <button
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={50} height={50} />
          </button>
        </div>
      </div>
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="WELCOME TO "
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vitae porro voluptatem eligendi quidem ea repudiandae consequuntur repellendus ipsam tempore! Quas quisquam ex nam voluptates sed voluptatem tenetur incidunt? Facere?
          Quo ipsum esse dolores? Officia, expedita? Praesentium quod facilis laudantium dicta pariatur odit ratione, enim perspiciatis ducimus similique porro voluptatem accusamus minus voluptates! Atque id numquam est labore esse nam."
            smallInfo="kindley select Your Name..."
            image={images.hero}
            functionName={createAccount}
            address={address}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default Navbar;
