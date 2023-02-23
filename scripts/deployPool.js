const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
const Web3Modal = require("web3modal");
require("dotenv").config();

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";

// Token addresses
const threeAddress = "0x47c05BCCA7d57c87083EB4e586007530eE4539e9";
const fourAddrss = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890";
const fiveAddress = "0x773330693cb7d5D233348E25809770A32483A940";

// Uniswap contract address
const wethAddress = "0xe14058B1c3def306e2cb37535647A04De03Db092";
const factoryAddress = "0x74ef2B06A1D2035C33244A4a263FF00B84504865";
const swapRouterAddress = "0xF5b81Fe0B6F378f9E6A3fb6A6cD1921FCeA11799";
const nftDescriptorAddress = "0x67baFF31318638F497f4c4894Cd73918563942c8";
const positionDescriptorAddress = "0x6533158b042775e2FdFeF3cA1a782EFDbB8EB9b1";
const positionManagerAddress = "0x73C68f1f41e4890D06Ba3e71b9E9DfA555f1fb46";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const provider = new ethers.providers.JsonRpcProvider(MAINNET_RPC_URL);

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

const nonfungiblePositionManager = new Contract(
  positionManagerAddress,
  artifacts.NonfungiblePositionManager.abi,
  provider
);

const factory = new Contract(
  factoryAddress,
  artifacts.UniswapV3Factory.abi,
  provider
);

async function deployPool(token0, token1, fee, price) {
  const [owner] = await ethers.getSigners();
  await nonfungiblePositionManager
    .connect(owner)
    .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
      gasLimit: 5000000,
    });

  const poolAddress = await factory.connect(owner).getPool(token0, token1, fee);
  return poolAddress;
}

async function main() {
  const FourFivePool = await deployPool(
    fourAddrss,
    fiveAddress,
    3000,
    encodePriceSqrt(1, 1)
  );

  console.log("FOUR_FIVE=", `'${FourFivePool}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
