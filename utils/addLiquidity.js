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

export const addLiquidityExternal = async (
  tokenAddress1,
  tokenAddress2,
  poolAddress,
  poolFee,
  tokenAmount1,
  tokenAmount2
) => {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const accountAddress = await signer.getAddress();

  const token1Contract = new Contract(
    tokenAddress1,
    artifacts.WETH9.abi,
    provider
  );
  const token2Contract = new Contract(
    tokenAddress2,
    artifacts.WETH9.abi,
    provider
  );

  await token1Contract
    .connect(signer)
    .approve(
      positionManagerAddress,
      ethers.utils.parseEther(tokenAmount1.toString())
    );

  await token2Contract
    .connect(signer)
    .approve(
      positionManagerAddress,
      ethers.utils.parseEther(tokenAmount2.toString())
    );

  const poolContract = new Contract(
    poolAddress,
    artifacts.UniswapV3Pool.abi,
    provider
  );

  const { chainId } = await provider.getNetwork();

  //TOKEN1
  const token1Name = await token1Contract.name();
  const token1Symbol = await token1Contract.symbol();
  const token1Decimals = await token1Contract.decimals();
  const token1Address = token1Contract.address;

  //TOKEN2
  const token2Name = await token2Contract.name();
  const token2Symbol = await token2Contract.symbol();
  const token2Decimals = await token2Contract.decimals();
  const token2Address = token2Contract.address;

  const TokenA = new Token(
    chainId,
    token1Address,
    token1Decimals,
    token1Name,
    token1Symbol
  );
  const TokenB = new Token(
    chainId,
    token2Address,
    token2Decimals,
    token2Name,
    token2Symbol
  );

  const poolData = await getPoolData(poolContract);
  console.log(poolData);

  const pool = new Pool(
    TokenA,
    TokenB,
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
    token0: tokenAddress1,
    token1: tokenAddress2,
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
    recipient: accountAddress,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  };

  const nonfungiblePositionManager = new Contract(
    positionManagerAddress,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );

  const tx = await nonfungiblePositionManager.connect(signer).mint(params, {
    gasLimit: "1000000",
  });
  const receipt = await tx.wait();
  return receipt;
};
