const hre = require("hardhat");

async function main() {

  const Democratiz_Art = await hre.ethers.getContractFactory("Democratiz_Art");
  const democratiz_art = await Democratiz_Art.deploy();

  await democratiz_art.deployed();

  console.log(
    "democratiz_art deployed to:", democratiz_art.address);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});