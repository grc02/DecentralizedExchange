import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithOneToken,
  connectingWithTwoToken,
  connectingWithSingleSwapToken,
  connectingWithIWETHToken,
  connectingWithDAIToken,
} from "../utils/appFeatures";

import { IWETHABI } from "./constants";
import ERC20 from "./json/ERC20.json";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  const swap = "SWAP";

  return (
    <SwapTokenContext.Provider value={swap}>
      {children}
    </SwapTokenContext.Provider>
  );
};
