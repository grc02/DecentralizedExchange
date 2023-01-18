const hre = require("hardhat");

async function main() {
  //Deploying Demo Tokens
  const One = await hre.ethers.getContractFactory("One");
  const one = await One.deploy();

  await one.deployed();
  console.log(`One Token deployed at: ${one.address}`);

  const Two = await hre.ethers.getContractFactory("Two");
  const two = await Two.deploy();

  await two.deployed();
  console.log(`Two Token deployed at: ${two.address}`);

  //SingleSwapToken
  const SingleSwapToken = await hre.ethers.getContractFactory(
    "SingleSwapToken"
  );
  const singleSwapToken = await SingleSwapToken.deploy();

  await singleSwapToken.deployed();
  console.log(`SingleSwapToken deployed at: ${singleSwapToken.address}`);

  //SwapMultiHop
  const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
  const swapMultiHop = await SwapMultiHop.deploy();

  await swapMultiHop.deployed();
  console.log(`SwapMultiHop deployed at: ${swapMultiHop.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
