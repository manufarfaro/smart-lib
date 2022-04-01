require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const solidity = "0.8.4";

module.exports = {
  solidity,
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  }
}