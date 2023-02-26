const hre = require("hardhat");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("SayGm");
  const gmContract = await contractFactory.deploy();
  await gmContract.deployed();
  console.log(`contract address: ${gmContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
