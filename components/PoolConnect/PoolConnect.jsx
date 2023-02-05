import React from "react";
import Image from "next/image";

import Style from "./PoolConnect.module.css";
import images from "../../assets";

const PoolConnect = () => {
  return (
    <div className={Style.PoolConnect}>
      <div className={Style.PoolConnectBox}>
        <div className={Style.PoolConnectBoxHeader}>
          <h2>Pool</h2>
          <p>+ New Position</p>
        </div>

        <div className={Style.PoolConnectBoxMiddle}>
          <Image src={images.wallet} alt="wallet" height={80} width={80} />
          <p>Your active V3 liquidity positions will appear here</p>
          <button>Connect Wallet</button>
        </div>

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
