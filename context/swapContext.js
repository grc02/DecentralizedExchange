import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import { Token, CurrenctAmount, TradeType, Percent } from "@uniswap/sdk-core";

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithOneToken,
  connectingWithTwoToken,
  connectingWithSingleSwapToken,
  connectingWithIWETHToken,
  connectingWithDAIToken,
  connectingWithUserStorageContract,
} from "../utils/appFeatures";

import { IWETHABI } from "./constants";
import ERC20 from "./json/ERC20.json";

import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../utils/swapUpdatePrice";
import { addLiquidityExternal } from "../utils/addLiquidity";
import { getLiquidityData } from "../utils/checkLiquidity";
import { creatingPoolContract } from "../utils/deployPool";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnection, setNetworkConnection] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");
  const [tokenData, setTokenData] = useState([]);
  const [getAllLiquidity, setGetAllLiquidity] = useState([]);

  const addToken = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH9
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", // BNB
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", // MATIC
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

      // //GET LIQUDITY
      const userStorageData = await connectingWithUserStorageContract();
      const userLiquidity = await userStorageData.getAllTransactions();

      userLiquidity.map(async (el, i) => {
        const liquidityData = await getLiquidityData(
          el.poolAddress,
          el.tokenAddress0,
          el.tokenAddress1
        );

        getAllLiquidity.push(liquidityData);
        console.log(getAllLiquidity);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  //CREATE AND ADD LIQUIDITY
  const createPoolAddLiquidity = async ({
    tokenAddress0,
    tokenAddress1,
    fee,
    tokenPrice1,
    tokenPrice2,
    slippage,
    deadline,
    tokenAmmountOne,
    tokenAmmountTwo,
  }) => {
    try {
      // First a pool must be created or already
      // exist before adding liquidity
      //CREATE POOL
      const createdPoolAddress = await creatingPoolContract(
        tokenAddress0,
        tokenAddress1,
        fee,
        tokenPrice1,
        tokenPrice2,
        {
          gasLimit: 500000,
        }
      );

      console.log(createdPoolAddress);

      //ADD LIQUIDITY
      const data = await addLiquidityExternal(
        tokenAddress0,
        tokenAddress1,
        poolAddress,
        fee,
        tokenAmmountOne,
        tokenAmmountTwo
      );
      console.log(data);

      // Update the userStorageData contract
      // which acts as a database
      //ADD DATA
      const userStorageData = await connectingWithUserStorageContract();
      await userStorageData.addTransaction(
        poolAddress,
        tokenAddress0,
        tokenAddress1
      );
    } catch (error) {
      console.log(error);
    }
  };

  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    try {
      let singleSwapToken, weth, dai;

      singleSwapToken = await connectingWithSingleSwapToken();
      weth = await connectingWithIWETHToken();
      dai = await connectingWithDAIToken();

      const decimals0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.utils.parseUnits(
        inputAmount.toString(),
        decimals0
      );

      await weth.deposit({ value: amountIn });
      await weth.approve(singleSwapToken.address, amountIn);

      //SWAP
      const tx = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress,
        token2.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        }
      );
      await tx.wait();

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
        connectWallet,
        swapUpdatePrice,
        createPoolAddLiquidity,
        singleSwapToken,
        getPrice,
        account,
        weth9,
        dai,
        networkConnection,
        ether,
        tokenData,
        getAllLiquidity,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};
