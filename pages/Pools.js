import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import images from "../assets";
import Style from "../styles/Pools.module.css";

import { PoolAdd, PoolConnect } from "../components/index";
import { SwapTokenContext } from "../context/swapContext";

const Pool = () => {
  const { account, createLiquidityAndPool, tokenData, getAllLiquidity } =
    useContext(SwapTokenContext);
  // Show the pool data only when the user is connected
  const [closePool, setClosePool] = useState(false);

  return (
    <div className={Style.Pool}>
      {" "}
      {account ? (
        <PoolAdd
          account={account}
          setClosePool={setClosePool}
          tokenData={tokenData}
          createLiquidityAndPool={createLiquidityAndPool}
        />
      ) : (
        <PoolConnect
          account={account}
          setClosePool={setClosePool}
          getAllLiquidity={getAllLiquidity}
        />
      )}
    </div>
  );
};

export default Pool;
