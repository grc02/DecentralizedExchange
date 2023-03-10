import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./Token.module.css";
import images from "../../assets";
import { Toggle } from "../index";

const Token = ({
  setOpenSetting,
  setSlippage,
  slippage,
  deadline,
  setDeadline,
}) => {
  return (
    <div className={Style.Token}>
      <div className={Style.TokenBox}>
        <div className={Style.TokenBoxHeader}>
          <h2>Interface Settings</h2>
          <Image
            src={images.close}
            alt="close"
            width={50}
            height={50}
            onClick={() => setOpenSetting(false)}
          />
        </div>
        <p className={Style.TokenBoxParagraph}>
          Slippage tolerance
          <Image
            src={images.question}
            alt="lock"
            width={25}
            height={25}
            onMouseOver={() => {}}
          />
        </p>

        <div className={Style.TokenBoxInput}>
          <button>Auto</button>
          <input
            type="text"
            placeholder={slippage}
            onChange={(e) => setSlippage(e.target.value)}
          />
        </div>

        <p className={Style.TokenBoxParagraph}>
          Transaction deadline
          <Image
            src={images.question}
            alt="lock"
            width={25}
            height={25}
            onMouseOver={() => {}}
          />
        </p>

        <div className={Style.TokenBoxToggle}>
          <Toggle label="No" />
        </div>

        <br />

        <div className={Style.TokenBoxInput}>
          <button>Minutes</button>
          <input
            type="text"
            placeholder={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Token;
