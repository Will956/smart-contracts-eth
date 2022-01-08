import { ethers } from "hardhat";

async function main() {
  // Retrieve accounts from the node
  const [devAccount, otherAccount] = await ethers.provider.listAccounts();
  console.log(
    `devAccount (${devAccount}) balance:`,
    ethers.utils.formatEther(
      (await ethers.provider.getBalance(devAccount)).toString()
    ),
    "eth"
  );
  console.log(
    `otherAccount (${otherAccount}) balance:`,
    ethers.utils.formatEther(
      (await ethers.provider.getBalance(otherAccount)).toString()
    ),
    "eth"
  );

  const Collectible = await ethers.getContractFactory("Collectible");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const collectible = await Collectible.attach(contractAddress);

  // await collectible.safeMint(otherAccount);
  console.log("aze", await collectible.ownerOf(0));
  console.log("aze", await collectible.tokenURI(0));
  console.log(
    "aze",
    await (await collectible.balanceOf(otherAccount)).toString()
  );
  console.log("aze", await (await collectible.tokenByIndex(0)).toString());
}

main()
  .then(() => (process.exitCode = 0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
