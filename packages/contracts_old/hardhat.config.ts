import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const solidity = "0.8.4";

export default {
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
}