import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

import { SwapTokenContext } from "../../context/swapContext";

const HeroSection = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false);

  const [tokenSwapOutput, setTokenSwapOutput] = useState(0);
  const [poolMessage, setPoolMessage] = useState("");
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);

  const {
    singleSwapToken,
    connectWallet,
    account,
    ether,
    dai,
    tokenData,
    getPrice,
    swapUpdatePrice,
  } = useContext(SwapTokenContext);

  //Token 1 details
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  //Token 2 details
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const callOutput = async (value) => {
    const yourAccount = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
    const deadline = 10;
    const slippageAmount = 25;
    const data = await swapUpdatePrice(
      value,
      slippageAmount,
      deadline,
      yourAccount
    );
    console.log(data);

    setTokenSwapOutput(data[1]);
    setSearch(false);

    const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8";
    const poolData = await getPrice(value, poolAddress);
    const message = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`;
    console.log(message);
    setPoolMessage(message);
  };

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
          <input
            type="text"
            placeholder="0"
            onChange={(e) => (
              callOutput(e.target.value),
              setSwapAmount(e.target.value),
              setSearch(true)
            )}
          />
          <button onClick={() => setOpenToken(true)}>
            <Image
              src={tokenOne.image || images.etherlogo}
              alt="logo"
              width={20}
              height={20}
            ></Image>
            {tokenOne.symbol || "ETH"}
            <small>{tokenOne.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        {/*// TOKEN 2 */}
        <div className={Style.HeroSectionBoxInput}>
          {/* <input type="text" placeholder="0" /> */}
          <p>
            {search ? (
              <Image
                src={images.loading}
                width={100}
                height={40}
                alt="loading"
              />
            ) : (
              tokenSwapOutput
            )}
          </p>
          <button onClick={() => setOpenTokensTwo(true)}>
            <Image
              src={tokenTwo.image || images.etherlogo}
              alt="logo"
              width={20}
              height={20}
            ></Image>
            {tokenTwo.symbol || "ETH"}
            <small>{tokenTwo.tokenBalance.slice(0, 7)}</small>
          </button>
        </div>

        {search ? (
          <Image src={images.loading} width={100} height={40} alt="loading" />
        ) : (
          poolMessage
        )}

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
