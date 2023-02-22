async function main() {
  const [owner] = await ethers.getSigners();

  const Three = await ethers.getContractFactory("Three", owner);
  const three = await Three.deploy();

  const Four = await ethers.getContractFactory("Four", owner);
  const four = await Four.deploy();

  const Five = await ethers.getContractFactory("Five", owner);
  const five = await Five.deploy();

  console.log("threeAddress=", `'${three.address}'`);
  console.log("fourAddrss=", `'${four.address}'`);
  console.log("fiveAddress=", `'${five.address}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
