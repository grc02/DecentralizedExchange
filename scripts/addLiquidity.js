const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");
// require("dotenv").config();

// const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";

// Token addresses
const threeAddress = "0x47c05BCCA7d57c87083EB4e586007530eE4539e9";
const fourAddrss = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890";
const fiveAddress = "0x773330693cb7d5D233348E25809770A32483A940";

// Pool address
const FOUR_FIVE = "0x9fA2bA155AA6A539A2914B4D4Db2ff24338A32d3";

// Uniswap contract address
const wethAddress = "0xe14058B1c3def306e2cb37535647A04De03Db092";
const factoryAddress = "0x74ef2B06A1D2035C33244A4a263FF00B84504865";
const swapRouterAddress = "0xF5b81Fe0B6F378f9E6A3fb6A6cD1921FCeA11799";
const nftDescriptorAddress = "0x67baFF31318638F497f4c4894Cd73918563942c8";
const positionDescriptorAddress = "0x6533158b042775e2FdFeF3cA1a782EFDbB8EB9b1";
const positionManagerAddress = "0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Four: require("../artifacts/contracts/demo/ERC20Four.sol/Four.json"),
  Five: require("../artifacts/contracts/ERC20Five.sol/Five.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  console.log(tickSpacing, fee, liquidity, slot0);
  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}
