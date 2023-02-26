const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

require("dotenv").config();

const fourAddress = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890";
const fiveAddress = "0x773330693cb7d5D233348E25809770A32483A940";

// Uniswap contract address
const factoryAddress = "0x2b639Cc84e1Ad3aA92D4Ee7d2755A6ABEf300D72";
const positionManagerAddress = "0xB468647B04bF657C9ee2de65252037d781eABafD";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

const provider = waffle.provider;

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
    fourAddress,
    fiveAddress,
    500,
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
