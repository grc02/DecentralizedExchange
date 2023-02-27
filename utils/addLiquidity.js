import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { Pool, Position, nearestUsableTick } from "@uniswap/v3-sdk";

// Uniswap contract address
const wethAddress = "0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026";
const factoryAddress = "0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72";
const swapRouterAddress = "0xF85895D097B2C25946BB95C4d11E2F3c035F8f0C";
const nftDescriptorAddress = "0x0b27a79cb9C0B38eE06Ca3d94DAA68e0Ed17F953";
const positionDescriptorAddress = "0x7bdd3b028C4796eF0EAf07d11394d0d9d8c24139";
const positionManagerAddress = "0xB468647B04bF657C9ee2de65252037d781eABafD";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
  WETH9: require("../context/json/WETH9.json"),
};

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}
