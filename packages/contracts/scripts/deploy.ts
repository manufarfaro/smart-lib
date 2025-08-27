import { ethers } from "hardhat";

const contractDefinitions = ["Library"];

const deployContracts = async () => {
  const deployedContracts = contractDefinitions.map(async (definition) => {
    const contractFactory = await ethers.getContractFactory(definition);
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    return contract;
  });

  await Promise.all(deployedContracts);
  console.log("Contracts were deployed.\n");
  console.log("Deployed contracts details:");

  for (let i = 0; i < deployedContracts.length; i++) {
    const c = await deployedContracts[i];
    const addr = await c.getAddress();
    console.log(`- ${contractDefinitions[i]} contract deployed to: ${addr}`);
  }
};

const runDeploy = async () => {
  try {
    await deployContracts();
    process.exit(0);
  } catch (err) {
    console.error(
      "There was an error when deploying contracts, Details: ",
      err
    );
    process.exit(1);
  }
};

runDeploy();
