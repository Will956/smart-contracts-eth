import { ethers } from "hardhat";

async function main() {
  const [devAccount] = await ethers.provider.listAccounts();
  console.log(
    "devAccount balance:",
    ethers.utils.formatEther(
      (await ethers.provider.getBalance(devAccount)).toString()
    ),
    "eth"
  );

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const contractAddress = "0x45A1D32B27c8d66351d7e7AF2B19B5c4c297F1FD";
  const simpleStorage = await SimpleStorage.attach(contractAddress);

  const currentValue = await simpleStorage.retrieve();
  console.log("Current SimpleStorage value is", currentValue.toString());

  const newValueToStore = "24";

  const estimatedGas = await simpleStorage.estimateGas.store(newValueToStore);
  console.log(
    "Gas estimation is:",
    ethers.utils.formatEther(estimatedGas.toString()),
    "eth"
  );

  console.log("Storing new value:", newValueToStore);
  const storeValueTx = await simpleStorage.store(newValueToStore);

  console.log("Waiting until the transaction is mined");
  await storeValueTx.wait();
  console.log("Transaction mined!");

  const newValue = await simpleStorage.retrieve();
  console.log("New SimpleStorage value is", newValue.toString());
}

main()
  .then(() => (process.exitCode = 0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
