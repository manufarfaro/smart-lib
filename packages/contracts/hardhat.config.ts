import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ganache";
import "@atixlabs/hardhat-time-n-mine";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";

const solidity = "0.8.4";

const config: HardhatUserConfig = {
  solidity,
  networks: {
    avax_testnet: {
      url: process.env.AVALANCHE_TESTNET_URL!,
      accounts: [process.env.METAMASK_PRIVATE_KEY!],
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
  },
  gasReporter: {
    currency: "USD",
  },
};

export default config;
