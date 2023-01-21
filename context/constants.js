import One from "./json/One.json";
import Two from "./json/Two.json";
import SingleSwapToken from "./json/SingleSwapToken.json";
import SwapMultiHop from "./json/SwapMultiHop.json";
import IWETH from "./json/IWETH.json";

// MAINNET FORK:
// One Token deployed at: 0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167
// Two Token deployed at: 0x25C0a2F0A077F537Bd11897F04946794c2f6f1Ef
// SingleSwapToken deployed at: 0x01cf58e264d7578D4C67022c58A24CbC4C4a304E
// SwapMultiHop deployed at: 0xd038A2EE73b64F30d65802Ad188F27921656f28F

// LOCAL NETWORK:
// One Token deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Two Token deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// SingleSwapToken deployed at: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// SwapMultiHop deployed at: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

export const OneTokenAddress = "0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167";
export const OneTokenABI = One.abi;

export const TwoTokenAddress = "0x25C0a2F0A077F537Bd11897F04946794c2f6f1Ef";
export const TwoTokenABI = Two.abi;

export const SingleSwapTokenAddress =
  "0x01cf58e264d7578D4C67022c58A24CbC4C4a304E";
export const SingleSwapTokenABI = SingleSwapToken.abi;

export const SwapMultiHopAddress = "0xd038A2EE73b64F30d65802Ad188F27921656f28F";
export const SwapMultiHopABI = SwapMultiHop.abi;

export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;
