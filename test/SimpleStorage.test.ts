import { ethers } from "hardhat";
import { expect } from "chai";

describe("SimpleStorage", () => {
  before(async function () {
    this.SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  });

  beforeEach(async function () {
    this.simpleStorage = await this.SimpleStorage.deploy();
    await this.simpleStorage.deployed();
  });

  it("retrieve returns a value previously stored", async function () {
    await this.simpleStorage.store(42);

    expect((await this.simpleStorage.retrieve()).toString()).to.equal("42");
  });

  it("fail by calling store from other account", async function () {
    const [, addr1] = await ethers.getSigners();

    await expect(
      this.simpleStorage.connect(addr1).store(100)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("store emits an event", async function () {
    await expect(this.simpleStorage.store(125))
      .to.emit(this.simpleStorage, "ValueChanged")
      .withArgs(125);
  });
});
