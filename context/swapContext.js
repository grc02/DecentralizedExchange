import React, { useState, useEffect } from "react";
import { ethers, BigNumber, logger } from "ethers";
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
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnection, setNetworkConnection] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [tokenData, setTokenData] = useState([]);

  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH9
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    // "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
    // "0x5FbDB2315678afecb367f032d93F642f64180aa3", // ONE
    // "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // TWO
  ];

  const fetchingData = async () => {
    try {
      const userAccount = await checkIfWalletConnected();
      setAccount(userAccount);

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const balance = await provider.getBalance(userAccount);
      const convertBal = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(convertBal);
      setEther(ethValue);

      const newtork = await provider.getNetwork();
      setNetworkConnection(newtork.name);

      addToken.map(async (el, i) => {
        const contract = new ethers.Contract(el, ERC20, provider);

        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        const symbol = await contract.symbol();
        const name = await contract.name();

        console.log(userAccount);
        console.log(symbol, name);

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });

        const wethContract = await connectingWithIWETHToken();
        const wethBalance = await wethContract.balanceOf(userAccount);
        setWeth9(ethers.utils.formatEther(wethBalance));

        const daiContract = await connectingWithDAIToken();
        const daiBalance = await daiContract.balanceOf(userAccount);
        setDai(ethers.utils.formatEther(daiBalance));

        console.log(weth9, dai);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <SwapTokenContext.Provider
      value={(account, weth9, dai, networkConnection, ether)}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
