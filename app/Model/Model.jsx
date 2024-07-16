import React, { useContext, useState } from "react";

//INTERNAL IMPORTS
import Style from "./Model.module.css";
import images from "../../assets/index";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Loader from "../Loader/Loader";
import Image from "next/image";

const Model = ({
  openBox,
  address,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  //USE STATE
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title}
            <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right__name}>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={address || "Enter Your Address..."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right__name_btn}>
                <button onClick={() => functionName({ name, accountAddress })}>
                  {" "}
                  <Image
                    src={images.send}
                    alt="send"
                    width={30}
                    height={30}
                  />{" "}
                  Submit
                </button>
                <button onClick={() => openBox(false)}>
                  {" "}
                  <Image
                    src={images.close}
                    alt="send"
                    width={30}
                    height={30}
                  />{" "}
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
