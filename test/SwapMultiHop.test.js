const { ethers } = require("hardhat");

describe("SwapMultiHop", function () {
  const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  let swapMultiHop, accounts, weth, dai, usdc;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");
    swapMultiHop = await SwapMultiHop.deploy();

    await swapMultiHop.deployed();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
  });

  describe("swapExactInputMultiHop", function () {
    it("Tests if the 'swapExactInputMultiHop' works as intended", async function () {
      const amountIn = 10n ** 18n;

      await weth.deposit({ value: amountIn });
      await weth.approve(swapMultiHop.address, amountIn);

      await swapMultiHop.swapExactInputMultiHop(amountIn);
      console.log(
        "DAI balance of the account №1 = ",
        ethers.utils.formatEther(await dai.balanceOf(accounts[0].address))
      );
      console.log(ethers.utils.formatEther(await accounts[0].getBalance()));
    });
  });

  describe("swapExactOutputMultiHop", function () {
    it("Tests if the 'swapExactOutputMultiHop' works as intended", async function () {
      // Swap input should be a maximum of 1 ETH and should swap it for DAI, where the desired amount is 1,000
      const wethAmountInMax = 10n ** 18n;
      const daiAmountOut = 100n * 10n ** 18n;

      await accounts[2].sendTransaction({
        value: wethAmountInMax,
        to: weth.address,
      });
      await weth
        .connect(accounts[2])
        .approve(swapMultiHop.address, wethAmountInMax);

      await swapMultiHop
        .connect(accounts[2])
        .swapExactOutputMultiHop(daiAmountOut, wethAmountInMax);

      console.log(
        "DAI balance of the account №3 = ",
        ethers.utils.formatEther(await dai.balanceOf(accounts[2].address))
      );
    });
  });
});
