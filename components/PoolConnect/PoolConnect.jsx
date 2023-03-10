import React from "react";
import Image from "next/image";

import Style from "./PoolConnect.module.css";
import images from "../../assets";

const PoolConnect = ({ account, setClosePool, getAllLiquidity }) => {
  let tokenList = [];
  for (let i = 0; i < getAllLiquidity.length / 2; i++) {
    tokenList.push(getAllLiquidity[i]);
  }

  return (
    <div className={Style.PoolConnect}>
      <div className={Style.PoolConnectBox}>
        <div className={Style.PoolConnectBoxHeader}>
          <h2>Pool</h2>
          <p onClick={() => setClosePool(true)}>+ New Position</p>
        </div>

        {!account ? (
          <div className={Style.PoolConnectBoxMiddle}>
            <Image src={images.wallet} alt="wallet" height={80} width={80} />
            <p>Your active V3 liquidity positions will appear here</p>
            <button>Connect Wallet</button>
          </div>
        ) : (
          <div className={Style.PoolConnectBoxLiquidity}>
            <div className={Style.PoolConnectBoxLiquidityHeader}>
              <p>Your Position {tokenList.length}</p>
            </div>

            {tokenList.map((el, i) => (
              <div className={Style.PoolConnectBoxLiquidityBox}>
                <div className={Style.PoolConnectBoxLiquidityList}>
                  <p>
                    <small className={Style.mark}>
                      {el.poolExample.token0.name}
                    </small>
                    {""}
                    <small className={Style.mark}>
                      {el.poolExample.token1.name}
                    </small>
                    {""}
                    <span className={(Style.paragraph, Style.hide)}>
                      {el.poolExample.token0.name} /{el.poolExample.token1.name}
                    </span>
                    {""}
                    <span className={Style.paragraph}>{el.fee}</span>
                    {""}
                  </p>
                  <p className={Style.highlight}>In Range</p>
                </div>
                <div className={Style.PoolConnectBoxLiquidityListInfo}>
                  <p>
                    <small>Min: 0.999</small>
                    {""}
                    <span>
                      {el.poolExample.token0.name} per {""}
                      {el.poolExample.token1.name}
                    </span>
                    {""} <span>--------</span> <small>Max: 1.000</small>
                    {""}
                    <span className={Style.hide}>
                      {el.poolExample.token0.name} per {""}{" "}
                      {el.poolExample.token1.name}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={Style.PoolConnectBoxInfo}>
          <div className={Style.PoolConnectBoxInfoLeft}>
            <h5>Learn about providing liquidity</h5>
            <p>Check out our v3 LP walkthrough and migrate guide</p>
          </div>
          <div className={Style.PoolConnectBoxInfoRight}>
            <h5>Top pools</h5>
            <p>Explore Uniswap Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolConnect;
