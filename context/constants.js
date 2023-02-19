import One from "./json/One.json";
import Two from "./json/Two.json";
import SingleSwapToken from "./json/SingleSwapToken.json";
import SwapMultiHop from "./json/SwapMultiHop.json";
import IWETH from "./json/IWETH.json";

// MAINNET FORK:
// One Token deployed at: 0xe14058B1c3def306e2cb37535647A04De03Db092
// Two Token deployed at: 0x74ef2B06A1D2035C33244A4a263FF00B84504865
// SingleSwapToken deployed at: 0xF5b81Fe0B6F378f9E6A3fb6A6cD1921FCeA11799
// SwapMultiHop deployed at: 0x67baFF31318638F497f4c4894Cd73918563942c8

// LOCAL NETWORK:
// One Token deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Two Token deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// SingleSwapToken deployed at: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// SwapMultiHop deployed at: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

export const OneTokenAddress = "0xe14058B1c3def306e2cb37535647A04De03Db092";
export const OneTokenABI = One.abi;

export const TwoTokenAddress = "0x74ef2B06A1D2035C33244A4a263FF00B84504865";
export const TwoTokenABI = Two.abi;

export const SingleSwapTokenAddress =
  "0xF5b81Fe0B6F378f9E6A3fb6A6cD1921FCeA11799";
export const SingleSwapTokenABI = SingleSwapToken.abi;

export const SwapMultiHopAddress = "0x67baFF31318638F497f4c4894Cd73918563942c8";
export const SwapMultiHopABI = SwapMultiHop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

export const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
