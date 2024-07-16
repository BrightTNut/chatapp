import React, { useContext, useState } from "react";
import Image from "next/image";
//INTERNAL IMPORTS
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Model from "../Model/Model";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);

  //USESTATE
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="search" />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet inventore necessitatibus ex expedita voluptate illum sed repudiandae saepe iste, magni nisi perspiciatis excepturi modi ipsam illo eius in incidunt. Quibusdam?
        Earum aut doloribus explicabo? Tempora quo libero incidunt eaque culpa vitae odit numquam doloremque dicta ipsam aut facere voluptatum quos quasi consequatur blanditiis repellendus, perferendis recusandae, magnam expedita commodi impedit.
     "
            smallInfo="Kindely Select Your Friend Name..."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
