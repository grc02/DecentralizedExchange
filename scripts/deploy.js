const ethers = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("...");
  const contract = await Contract.deploy();

  await contract.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
