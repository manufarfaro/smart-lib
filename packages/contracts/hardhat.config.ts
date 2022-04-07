import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

const solidity = "0.8.4";

const config: HardhatUserConfig = {
  solidity,
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  gasReporter: {
    currency: "USD"
  }
};

export default config;
