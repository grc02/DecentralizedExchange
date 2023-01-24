import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

import { SwapTokenContext } from "../../context/swapContext";

const HeroSection = ({ tokenData }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const { singleSwapToken, connectWallet, account, ether, dai } =
    useContext(SwapTokenContext);
  // ether,
  // dai,
  // tokenData,
  // getPrice,
  // swapUpdatePrice

  //Token 1 details
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
  });

  //Token 2 details
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
  });
  return (
    <div className={Style.HeroSection}>
      <div className={Style.HeroSectionBox}>
        <div className={Style.HeroSectionBoxHeader}>
          <h1>Swap</h1>
          <div className={Style.HeroSectionBoxHeaderImage}>
            <Image
              src={images.close}
              alt="logo"
              width={50}
              height={50}
              onClick={() => setOpenSetting(true)}
            ></Image>
          </div>
        </div>

        {/*// TOKEN 1 */}
        <div className={Style.HeroSectionBoxInput}>
          <input type="text" placeholder="0" />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenOne.image || images.etherlogo}
              alt="logo"
              width={20}
              height={20}
            ></Image>
            {tokenOne.name || "ETH"}
            <small>{ether.slice(0, 7)}</small>
          </button>
        </div>

        {/*// TOKEN 2 */}
        <div className={Style.HeroSectionBoxInput}>
          <input type="text" placeholder="0" />
          <button onClick={() => setOpenTokensTwo(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              alt="logo"
              width={20}
              height={20}
            ></Image>
            {tokenTwo.name || "ETH"}
            <small>{dai.slice(0, 7)}</small>
          </button>
        </div>

        {account ? (
          <button
            className={Style.HeroSectionBoxBtn}
            onClick={() => singleSwapToken()}
          >
            Swap
          </button>
        ) : (
          <button
            className={Style.HeroSectionBoxBtn}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {openSetting && <Token setOpenSetting={setOpenSetting} />}

      {openToken && (
        <SearchToken
          openToken={setOpenToken}
          tokens={setTokenOne}
          tokenData={tokenData}
        />
      )}
      {openTokensTwo && (
        <SearchToken
          openToken={setOpenTokensTwo}
          tokens={setTokenTwo}
          tokenData={tokenData}
        />
      )}
    </div>
  );
};

export default HeroSection;
