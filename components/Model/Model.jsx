import React, { useState, useEffect } from "react";
import Image from "next/image";

import Style from "./Model.module.css";
import images from "../../assets";

const Model = ({ setOpenModel, connectWallet }) => {
  const walletMenu = ["Metamask", "Coinbase", "Wallet", "WalletConnect"];

  return (
    <div className={Style.Model}>
      <div className={Style.ModelBox}>
        <div className={Style.ModelBoxHeader}>
          <h2>Connect wallet</h2>
          <div className={Style.ModelBoxHeaderImage}>
            <Image
              src={images.close}
              alt="logo"
              width={50}
              height={50}
              onClick={() => setOpenModel(false)}
            ></Image>
          </div>
        </div>

        <div className={Style.ModelBoxWallet}>
          {walletMenu.map((el, i) => (
            <p key={i + 1} onClick={() => connectWallet()}>
              {el}
            </p>
          ))}
        </div>
        <p className={Style.ModelBoxParagraph}>
          By connecting a wallet, you agree to Uniswap Labs’
          <br /> Terms of Service and consent to its Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Model;
