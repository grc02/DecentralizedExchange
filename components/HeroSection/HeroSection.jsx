import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

const HeroSection = ({ accounts, tokenData }) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

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
          <p>Swap</p>
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
            <small>4381</small>
          </button>
        </div>

        {/*// TOKEN 2 */}
        <div className={Style.HeroSectionBoxInput}>
          <input type="text" placeholder="0" />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              alt="logo"
              width={20}
              height={20}
            ></Image>
            {tokenTwo.name || "ETH"}
            <small>4381</small>
          </button>
        </div>

        {accounts ? (
          <button className={Style.HeroSectionBoxBtn}>Connect Wallet</button>
        ) : (
          <button className={Style.HeroSectionBoxBtn} onClick={() => {}}>
            Swap
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
