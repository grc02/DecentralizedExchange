import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./TokenList.module.css";
import images from "../../assets";

const TokenList = ({ setOpenTokenBox, tokenData }) => {
  let tokenList = [];
  for (let i = 0; i < tokenData.length / 2; i++) {
    tokenList.push(tokenData[i]);
  }

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

      {tokenList.map((el, i) => (
        <div className={Style.TokenListBox}>
          <div className={Style.TokenListBoxInfo}>
            <p className={Style.TokenListBoxInfoSymbol}>{el.symbol}</p>
            <p>
              <span>{el.tokenBalance.slice(0, 9)}</span> {el.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
