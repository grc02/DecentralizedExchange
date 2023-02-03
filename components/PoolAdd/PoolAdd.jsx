import React, { useState, useEffect } from "react";
import Image from "next/image";

import images from "../../assets";
import Style from "./PoolAdd.module.css";
import { Token, SearchToken } from "../index";

const PoolAdd = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openTokenModel, setOpenTokenModel] = useState(false);
  const [active, setActive] = useState(1);
  const [openFee, setOpenFee] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

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

  const minPriceRange = (text) => {
    if (text == "+") {
      setMinPrice(minPrice + 1);
    } else if (text == "-") {
      setMinPrice(minPrice - 1);
    }
  };

  const maxPriceRange = (text) => {
    if (text == "+") {
      setMaxPrice(maxPrice + 1);
    } else if (text == "-") {
      setMaxPrice(maxPrice - 1);
    }
  };

  return (
    <div className={Style.PoolAdd}>
      <div className={Style.PoolAddBox}>
        {/* //HEADER SECTION */}
        <div className={Style.PoolAddBoxHeader}>
          <div className={Style.PoolAddBoxHeaderLeft}>
            <Image src={images.arrowLeft} alt="image" width={30} height={30} />
          </div>
          <div className={Style.PoolAddBoxHeaderMiddle}>
            <p>Add Liqudity</p>
          </div>
          <div className={Style.PoolAddBoxHeaderRight}>
            <p>Clear All</p>
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
              <div className={Style.PoolAddBoxPriceLeftTokenInfo}>
                <p>
                  <Image
                    src={images.etherlogo}
                    alt="image"
                    width={20}
                    height={20}
                  />
                </p>
                <p>UNI</p>
                <p>🡫</p>
              </div>
              <div
                className={Style.PoolAddBoxPriceLeftTokenInfo}
                onClick={() => {
                  setOpenTokenModel(true);
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
                <p>WETH</p>
                <p>🡫</p>
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
                    <small>UNI</small>
                  </p>
                  <p className={Style.PoolAddBoxDepositBoxInput}>
                    Balance: 0.00
                  </p>
                </div>
              </div>

              <div className={Style.PoolAddBoxDepositBox}>
                <input
                  type="number"
                  placeholder={tokenOne.tokenBalance.slice(0, 9)}
                  onChange={(e) => setTokenAmountOne(e.target.value)}
                />
                <div className={Style.PoolAddBoxDepositBoxInput}>
                  <p>
                    <small>UNI</small>
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
                Current Price: 41.1494 TestV4 per WETH
              </p>
              <Image src={images.wallet} alt="wallet" height={80} width={80} />
              <h3>Your position will appear here.</h3>
            </div>

            {/* //PRICE RANGE */}
          </div>
          {/* //RIGHT SECTION END */}
        </div>
      </div>
    </div>
  );
};
