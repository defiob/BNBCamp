require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      }
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    bnbtest: {
      url: process.env.bnb_testnet_url,
      accounts: [process.env.bnb_private_key],
    }
  },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: process.env.bnb_api_key,
  }
};
