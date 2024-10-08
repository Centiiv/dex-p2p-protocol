require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

module.exports = {
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      bscTestnet: process.env.ETHERSCAN_API_KEY_BSC,
    },
  },
  networks: {
    hardhat: {},
    bscTestnet: {
      url: process.env.NETWORK_RPC_URL_BSC_TESTNET,
      chainId: 97,

      accounts: [process.env.PRIVATE_KEY],
    },

    sepolia: {
      url: process.env.NETWORK_RPC_URL_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.NETWORK_RPC_URL_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
