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
          </div>
        </div>
        {/* //LEFT SECTION UNTIL HERE */}
      </div>
    </div>
  );
};
