const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";

const threeAddress = "0xB468647B04bF657C9ee2de65252037d781eABafD";
const fourAddress = "0x47c05BCCA7d57c87083EB4e586007530eE4539e9";
const fiveAddress = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890";

// Pool address
const FOUR_FIVE = "0x9fA2bA155AA6A539A2914B4D4Db2ff24338A32d3";

// Uniswap contract address
const wethAddress = "0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46";
const factoryAddress = "0xD2D5e508C82EFc205cAFA4Ad969a4395Babce026";
const swapRouterAddress = "0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72";
const nftDescriptorAddress = "0xF85895D097B2C25946BB95C4d11E2F3c035F8f0C";
const positionDescriptorAddress = "0x0b27a79cb9C0B38eE06Ca3d94DAA68e0Ed17F953";
const positionManagerAddress = "0x7bdd3b028C4796eF0EAf07d11394d0d9d8c24139";

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

  console.log(tickSpacing, fee, liquidity, slot0);
  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

async function main() {
  const [owner, signer] = await ethers.getSigners();
  //   const MAINNET_URL = "test network your";

  //   const WALLET_ADDRESS = "Address";
  //   const WALLET_SECRET = "Your Wallet Private Key";
  const provider = new ethers.providers.JsonRpcProvider(MAINNET_RPC_URL);
  //   const wallet = new ethers.Wallet(WALLET_SECRET);
  //   const signer = wallet.connect(provider);

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

  const tx = await nonfungiblePositionManager
    .connect(signer)
    .mint(params, { gasLimit: "1000000" });
  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
