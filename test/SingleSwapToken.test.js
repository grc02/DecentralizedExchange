const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SingleSwapToken", function () {
  const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  let singleSwapToken, accounts, weth, dai, usdc;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
    singleSwapToken = await SingleSwapToken.deploy();

    await singleSwapToken.deployed();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
  });

  it("Tests if the 'swapExactInputSingle' works as intended", async function () {
    const amountIn = 10n ** 18n;

    await weth.deposit({ value: amountIn });
    await weth.approve(singleSwapToken.address, amountIn);

    await singleSwapToken.swapExactInputSingle(amountIn);
    console.log(
      "DAI balance of the account №1 = ",
      ethers.utils.formatEther(await dai.balanceOf(accounts[0].address))
    );
    console.log(ethers.utils.formatEther(await accounts[0].getBalance()));
  });

  it("Tests if the 'swapExactOutputSingle' works as intended", async function () {
    // Swap input should be a maximum of 1 ETH and should swap it for DAI, where the desired amount is 1,000
    const wethAmountInMax = 10n ** 18n;
    const daiAmountOut = 100n * 10n ** 18n;

    await accounts[0].sendTransaction({
      to: weth.address,
      value: wethAmountInMax,
    });
    await weth.approve(singleSwapToken.address, wethAmountInMax);

    await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmountInMax);

    console.log(
      "DAI balance of the account №1 = ",
      ethers.utils.formatEther(await dai.balanceOf(accounts[0].address))
    );
  });
});
