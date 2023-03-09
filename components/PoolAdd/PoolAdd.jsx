import React, { useState, useEffect } from "react";
import Image from "next/image";

import images from "../../assets";
import Style from "./PoolAdd.module.css";
import { Token, SearchToken } from "../index";

const PoolAdd = ({
  account,
  setClosePool,
  tokenData,
  createPoolAddLiquidity,
}) => {
  const [openModel, setOpenModel] = useState(false);
  const [openTokenModelOne, setOpenTokenModelOne] = useState(false);
  const [openTokenModelTwo, setOpenTokenModelTwo] = useState(false);
  const [active, setActive] = useState(1);
  const [openFee, setOpenFee] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [fee, setFee] = useState(0);
  const [slippage, setSlippage] = useState(25);
  const [deadline, setDeadline] = useState(10);
  const [tokenAmountOne, setTokenAmountOne] = useState(0);
  const [tokenAmountTwo, setTokenAmountTwo] = useState(0);

  //TOKEN 1
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });
  //TOKEN 2
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: "",
  });

  const feePairs = [
    {
      fee: "0.05%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 500,
    },
    {
      fee: "0.3%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 3000,
    },
    {
      fee: "1%",
      info: "Best for stable pairs",
      number: "0% Select",
      feeSystem: 10000,
    },
  ];

  return (
    <div className={Style.PoolAdd}>
      <div className={Style.PoolAddBox}>
        {/* //HEADER SECTION */}
        <div className={Style.PoolAddBoxHeader}>
          <div className={Style.PoolAddBoxHeaderLeft}>
            <Image
              src={images.arrowLeft}
              alt="image"
              width={30}
              height={30}
              onClick={() => setClosePool(false)}
            />
          </div>
          <div className={Style.PoolAddBoxHeaderMiddle}>
            <p>Add Liqudity</p>
          </div>
          <div className={Style.PoolAddBoxHeaderRight}>
            <p>
              {tokenOne.name || ""} {tokenOne.tokenBalance.slice(0, 9) || ""}
              {""}
              {""}
              {tokenTwo.name || ""} {tokenTwo.tokenBalance.slice(0, 9) || ""}
            </p>
            <Image
              src={images.close}
              alt="image"
              width={50}
              height={50}
              onClick={() => setOpenModel(true)}
            />
          </div>
        </div>

        {/* //SELECT PRICE RANGE SECTION */}
        <div className={Style.PoolAddBoxPrice}>
          {/* //LEFT */}
          <div className={Style.PoolAddBoxPriceLeft}>
            <h4>Select Pair</h4>
            <div className={Style.PoolAddBoxPriceLeftToken}>
              <div
                className={Style.PoolAddBoxPriceLeftTokenInfo}
                onClick={() => {
                  setOpenTokenModelOne(true);
                }}
              >
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>{tokenOne.name || "ETH"}</p>
                <p>
                  <Image
                    src={images.search}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
              </div>
              <div
                className={Style.PoolAddBoxPriceLeftTokenInfo}
                onClick={() => {
                  setOpenTokenModelTwo(true);
                }}
              >
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>{tokenTwo.name || "Select"}</p>
                <p>
                  <Image
                    src={images.search}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
              </div>
            </div>

            {/* //FEE */}
            <div className={Style.PoolAddBoxPriceLeftFee}>
              <div className={Style.PoolAddBoxPriceLeftFeeBox}>
                <h4>Fee teir</h4>
                <p>The % you will earn in fees</p>
              </div>
              {openFee ? (
                <button onClick={() => setOpenFee(false)}>Hide</button>
              ) : (
                <button onClick={() => setOpenFee(true)}>Show</button>
              )}
            </div>

            {/* //FEE LIST */}
            {openFee && (
              <div className={Style.PoolAddBoxPriceLeftList}>
                {feePairs.map((el, i) => (
                  <div
                    className={Style.PoolAddBoxPriceLeftListItem}
                    key={i + 1}
                    onClick={() => (setActive(i + 1), setFee(el.feeSystem))}
                  >
                    <div className={Style.PoolAddBoxPriceLeftListItemInfo}>
                      <p>{el.fee}</p>
                      <p>
                        {active == i + 1 ? (
                          <Image
                            src={images.tick}
                            alt="image"
                            width={20}
                            height={20}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>

                    <small>{el.info}</small>
                    <p className={Style.PoolAddBoxPriceLeftListItemPara}>
                      {el.number}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* //DEPOSIT AMOUNT */}
            <div className={Style.PoolAddBoxDeposit}>
              <h4>Deposit Amount</h4>

              <div className={Style.PoolAddBoxDepositBox}>
                <input
                  type="number"
                  placeholder={tokenOne.tokenBalance.slice(0, 9)}
                  onChange={(e) => setTokenAmountOne(e.target.value)}
                />
                <div className={Style.PoolAddBoxDepositBoxInput}>
                  <p>
                    <small>{tokenOne.name || "Ether"}</small> {""}{" "}
                    {tokenOne.symbol || "ETH"}
                  </p>
                  <p className={Style.PoolAddBoxDepositBoxInput}>
                    Balance: 0.00
                  </p>
                </div>
              </div>

              <div className={Style.PoolAddBoxDepositBox}>
                <input
                  type="number"
                  placeholder={tokenTwo.tokenBalance.slice(0, 9)}
                  onChange={(e) => setTokenAmountTwo(e.target.value)}
                />
                <div className={Style.PoolAddBoxDepositBoxInput}>
                  <p>
                    <small>{tokenTwo.name || "Ether"}</small> {""}{" "}
                    {tokenTwo.symbol || "Select"}
                  </p>
                  <p className={Style.PoolAddBoxDepositBoxInput}>
                    Balance: 0.00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* //RIGHT */}
          <div className={Style.PoolAddBoxPriceRight}>
            <h4>Set Price Range</h4>
            {/* //UPPER RIGHT WALLET DETAILS SECTION */}
            <div className={Style.PoolAddBoxPriceRightBox}>
              <p className={Style.PoolAddBoxPriceRightBoxPara}>
                Current Price: 41.1494 {tokenOne.name || "ETH"} per{" "}
                {tokenTwo.name || "Select"}
              </p>
              <Image src={images.wallet} alt="wallet" height={80} width={80} />
              <h3>Your position will appear here.</h3>
            </div>

            {/* //PRICE RANGE - MIDDLE RIGHT SECTION */}
            <div className={Style.PoolAddBoxPriceRightRange}>
              {/* //MIN */}
              <div className={Style.PoolAddBoxPriceRightRangeBox}>
                <p>Min Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className={Style.PoolAddBoxPriceRightRangeBoxPara}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <p>
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>
              {/* //MAX */}
              <div className={Style.PoolAddBoxPriceRightRangeBox}>
                <p>Max Price</p>
                <input
                  type="number"
                  placeholder="0.000"
                  min="0.00"
                  step="0.001"
                  className={Style.PoolAddBoxPriceRightRangeBoxPara}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <p>
                  {tokenOne.name || "ETH"} per {tokenTwo.name || "Select"}
                </p>
              </div>
            </div>

            {/* BUTTONS - LOWER RIGHT SECTION */}
            <div className={Style.PoolAddBoxPriceRightAmount}>
              <button
                onClick={() =>
                  createLiquidityAndPool({
                    tokenAddress0: tokenOne.tokenAddress.tokenAddress,
                    tokenAddress1: tokenTwo.tokenAddress.tokenAddress,
                    fee: fee,
                    tokenPrice1: minPrice,
                    tokenPrice2: maxPrice,
                    slippage: slippage,
                    deadline: deadline,
                    tokenAmmountOne: tokenAmountOne,
                    tokenAmmountTwo: tokenAmountTwo,
                  })
                }
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModel && (
        <div className={Style.token}>
          <Token
            setOpenSetting={setOpenModel}
            setSlippage={setSlippage}
            slippage={slippage}
            deadline={deadline}
            setDeadline={setDeadline}
          />
        </div>
      )}

      {openTokenModelOne && (
        <div className={Style.token}>
          <SearchToken
            tokenData={tokenData}
            tokens={setTokenOne}
            openToken={setOpenTokenModelOne}
          />
        </div>
      )}

      {openTokenModelTwo && (
        <div className={Style.token}>
          <SearchToken
            tokenData={tokenData}
            tokens={setTokenTwo}
            openToken={setOpenTokenModelTwo}
          />
        </div>
      )}
    </div>
  );
};

export default PoolAdd;
