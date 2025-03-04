const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ETHWallet contract", function () {
  let owner, addr1, addr2, wallet;

  this.beforeEach(async function () {
    [owner, addr1, addr2] =  await ethers.getSigners(); 
    // Deploy the contract and assign the wallet variable
    //wallet = await ethers.deployContract("Lab1");
    const ETHWallet = await ethers.getContractFactory("Lab1");
    wallet = await ETHWallet.deploy(owner.address);
  });

  it("Should emits an Received event when received ETH", async function () {
    // expect() listens for the Received() event on the contract
    await expect(
      await addr1.sendTransaction({
        to: await wallet.getAddress(),
        value: ethers.parseEther("1.0")
      })
    )
      .to.emit(wallet, "Received") // Check if the "Received" event is emitted
      .withArgs(addr1.address, ethers.parseEther("1.0")); // Check if the values match
  });

  it("Should allow the owner to withdraw ETH", async function () {
    await addr1.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1.0")
    })

    await wallet.withdraw();

    // const contractBalance = await ethers.provider.getBalance(wallet.address);
    // expect(contractBalance).to.equal(0);
  });

  it("Should not allow non-owner to withdraw ETH", async function () {
    await addr1.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1.0")
    })

    await expect(
      wallet.connect(addr2).withdraw()
    ).to.be.revertedWith("You are not the owner of the wallet.");

    // const contractBalance = await ethers.provider.getBalance(wallet.address);
    // expect(contractBalance).to.equal(1.0);
  });

});