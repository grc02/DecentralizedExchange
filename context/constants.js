import One from "./json/One.json";
import Two from "./json/Two.json";
import SingleSwapToken from "./json/SingleSwapToken.json";
import SwapMultiHop from "./json/SwapMultiHop.json";
import IWETH from "./json/IWETH.json";

// MAINNET FORK:
// One Token deployed at: 0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46
// Two Token deployed at: 0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026
// SingleSwapToken deployed at: 0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72
// SwapMultiHop deployed at: 0xF85895D097B2C25946BB95C4d11E2F3c035F8f0C

// LOCAL NETWORK:
// One Token deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Two Token deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// SingleSwapToken deployed at: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// SwapMultiHop deployed at: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

export const OneTokenAddress = "0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46";
export const OneTokenABI = One.abi;

export const TwoTokenAddress = "0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026";
export const TwoTokenABI = Two.abi;

export const SingleSwapTokenAddress =
  "0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72";
export const SingleSwapTokenABI = SingleSwapToken.abi;

export const SwapMultiHopAddress = "0xF85895D097B2C25946BB95C4d11E2F3c035F8f0C";
export const SwapMultiHopABI = SwapMultiHop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

export const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
