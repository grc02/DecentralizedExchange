import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./TokenList.module.css";
import images from "../../assets";

const TokenList = ({ setOpenTokenBox, tokenData }) => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className={Style.TokenList}>
      <p
        className={Style.TokenListClose}
        onClick={() => {
          setOpenTokenBox(false);
        }}
      >
        <Image src={images.close} alt="logo" width={50} height={50} />
      </p>
      <div className={Style.TokenListTitle}>Your Token List</div>

      {data.map((el, i) => (
        <div className={Style.TokenListBox}>
          <div className={Style.TokenListBoxInfo}>
            <p className={Style.TokenListBoxInfoSymbol}>SYMBOL</p>
            <p>
              <span>27</span> TOKEN
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
