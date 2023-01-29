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
    "0x01cf58e264d7578D4C67022c58A24CbC4C4a304E", // ONE
    "0xd038A2EE73b64F30d65802Ad188F27921656f28F", // TWO
    // "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
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

      const network = await provider.getNetwork();
      setNetworkConnection(network.name);

      addToken.map(async (el, i) => {
        const contract = new ethers.Contract(el, ERC20, provider);

        const userBalance = await contract.balanceOf(userAccount);
        const tokenLeft = BigNumber.from(userBalance).toString();
        const convertTokenBal = ethers.utils.formatEther(tokenLeft);

        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertTokenBal,
          tokenAddress: el,
        });
      });

      const wethContract = await connectingWithIWETHToken();
      const wethBalance = await wethContract.balanceOf(userAccount);
      setWeth9(ethers.utils.formatEther(wethBalance));

      const daiContract = await connectingWithDAIToken();
      const daiBalance = await daiContract.balanceOf(userAccount);
      setDai(ethers.utils.formatEther(daiBalance));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const singleSwapToken = async () => {
    try {
      let singleSwapToken, weth, dai;

      singleSwapToken = await connectingWithSingleSwapToken();
      weth = await connectingWithIWETHToken();
      dai = await connectingWithDAIToken();

      const amountIn = 10n ** 18n;
      await weth.deposit({ value: amountIn });
      await weth.approve(singleSwapToken.address, amountIn);
      //SWAP
      await singleSwapToken.swapExactInputSingle(amountIn, {
        gasLimit: 300000,
      });

      const balance = await dai.balanceOf(account);
      const transferAmount = BigNumber.from(balance).toString();
      const ethValue = ethers.utils.formatEther(transferAmount);
      setDai(ethValue);

      console.log(`DAI balance: ${ethValue}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        account,
        weth9,
        dai,
        networkConnection,
        connectWallet,
        singleSwapToken,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
