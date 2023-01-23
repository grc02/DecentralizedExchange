import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  OneTokenAddress,
  OneTokenABI,
  TwoTokenAddress,
  TwoTokenABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  SwapMultiHopAddress,
  SwapMultiHopABI,
  IWETHAddress,
  IWETHABI,
} from "../context/constants";

//CHECK IF WALLET IS CONNECTED
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//CONNECT WALLET
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//CONNECTING With One TOKEN CONTRACT
export const connectingWithOneToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(OneTokenAddress, OneTokenABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//CONNECTING With Two TOKEN CONTRACT
export const connectingWithTwoToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(TwoTokenAddress, TwoTokenABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//CONNECTING With SingleSwap TOKEN CONTRACT
export const connectingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      SingleSwapTokenAddress,
      SingleSwapTokenABI,
      signer
    );
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//CONNECTING With IWETH TOKEN CONTRACT
export const connectingWithIWETHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(IWETHAddress, IWETHABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

//CONNECTING With DAI TOKEN CONTRACT
export const connectingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(DAIAddress, IWETHABI, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
