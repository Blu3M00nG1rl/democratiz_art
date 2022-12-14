require('dotenv').config();
require("@nomicfoundation/hardhat-chai-matchers");
const fs = require('fs');
require('dotenv').config();
task("accounts", "Affiche la liste des comptes", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {

    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_GOERLI_ID}`,
      accounts: [`0x` + process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_MUMBAI_ID}`,
      accounts: [`0x` + process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.17",
  paths: {
    artifacts: './src/artifacts'
  }
};