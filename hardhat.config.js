require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: MAINNET_RPC_URL,
      },
    },
  },
};
