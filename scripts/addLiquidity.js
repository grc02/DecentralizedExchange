const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");
const { ethers, waffle } = require("hardhat");
require("dotenv").config();

const fourAddress = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890";
const fiveAddress = "0x773330693cb7d5D233348E25809770A32483A940";

// Pool address
const FOUR_FIVE = "0xe1717D2fa8B1D2ec0ad2453B755a4B4644AD038F";

// Uniswap contract address
const positionManagerAddress = "0xB468647B04bF657C9ee2de65252037d781eABafD";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Four: require("../artifacts/contracts/demo/ERC20Four.sol/Four.json"),
  Five: require("../artifacts/contracts/demo/ERC20Five.sol/Five.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
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

async function main() {
  const [signer] = await ethers.getSigners();
  const provider = waffle.provider;

  const FourContract = new Contract(fourAddress, artifacts.Four.abi, provider);
  const FiveContract = new Contract(fiveAddress, artifacts.Five.abi, provider);

  await FourContract.connect(signer).approve(
    positionManagerAddress,
    ethers.utils.parseEther("1000")
  );
  await FiveContract.connect(signer).approve(
    positionManagerAddress,
    ethers.utils.parseEther("1000")
  );

  const poolContract = new Contract(
    FOUR_FIVE,
    artifacts.UniswapV3Pool.abi,
    provider
  );

  const poolData = await getPoolData(poolContract);

  const FourToken = new Token(31337, fourAddress, 18, "Four Token", "FOUR");
  const FiveToken = new Token(31337, fiveAddress, 18, "Five Token", "FIVE");

  const pool = new Pool(
    FourToken,
    FiveToken,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseUnits("1"),
    tickLower:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) -
      poolData.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) +
      poolData.tickSpacing * 2,
  });

  const { amount0: amount0Desired, amount1: amount1Desired } =
    position.mintAmounts;

  const params = {
    token0: fourAddress,
    token1: fiveAddress,
    fee: poolData.fee,
    tickLower:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) -
      poolData.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) +
      poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: signer.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
  };

  const nonfungiblePositionManager = new Contract(
    positionManagerAddress,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );

  try {
    const tx = await nonfungiblePositionManager
      .connect(signer)
      .mint(params, { gasLimit: "1000000" });
    await tx.wait();
  } catch (error) {
    console.log(error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
