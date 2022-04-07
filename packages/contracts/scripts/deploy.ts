// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const contractDefinitions = ["Library"];

const deployContracts  = async () => {
  const deployedContracts = contractDefinitions.map(async definition => {
      const contractFactory = await ethers.getContractFactory(definition);
      const contract = await contractFactory.deploy();
      await contract.deployed()
      return contract;
  });

  await Promise.all(deployedContracts);
  console.log("Contracts were deployed.\n");
  console.log("Deployed contracts details:")

  deployedContracts.forEach(async (contract, i) => console.log(`- ${contractDefinitions[i]} contract deployed to: ${(await contract).address}`));

}

const runDeploy = async () => {
  try {
      await deployContracts();
      process.exit(0);
  } catch(err) {
      console.error("There was an error when deploying contracts, Details: ", err);
      process.exit(1);
  }
}

runDeploy();