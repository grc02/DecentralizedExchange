require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "";
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || "0x";

module.exports = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: MAINNET_RPC_URL,
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
  },
};
