import { ethers } from "hardhat";

async function main() {
  // Retrieve accounts from the node
  const [devAccount] = await ethers.provider.listAccounts();
  console.log(
    "devAccount balance:",
    ethers.utils.formatEther(
      (await ethers.provider.getBalance(devAccount)).toString()
    ),
    "eth"
  );

  // Set up an ethers contract, representing our deployed SimpleStorage instance
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const simpleStorage = await SimpleStorage.attach(contractAddress);

  // Call the retrieve() function of the deployed SimpleStorage contract
  const currentValue = await simpleStorage.retrieve();
  console.log("Current SimpleStorage value is", currentValue.toString());

  // Send a transaction to store() a new value in the SimpleStorage
  await simpleStorage.store(23);

  // Call the retrieve() function of the deployed SimpleStorage contract
  const newValue = await simpleStorage.retrieve();
  console.log("New SimpleStorage value is", newValue.toString());
}

main()
  .then(() => (process.exitCode = 0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
