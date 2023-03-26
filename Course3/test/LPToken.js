const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const base18 = 10 ** 18;

describe("LPToken contract", function () {
  async function deployLPTokenFixture() {
    const LPToken = await ethers.getContractFactory("LPToken");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const hardhatLPToken = await LPToken.deploy();
    await hardhatLPToken.deployed();
    return { LPToken, hardhatLPToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatLPToken, owner } = await loadFixture(deployLPTokenFixture);
      expect(await hardhatLPToken.owner()).to.equal(owner.address);
      console.log("owner.address", owner.address);
      expect(await hardhatLPToken.name()).to.equal("LPToken");
      expect(await hardhatLPToken.symbol()).to.equal("LPT");
    });

    it("Only owner can be mint", async function () {
      const { hardhatLPToken, owner } = await loadFixture(deployLPTokenFixture);
      let ownerBalance = await hardhatLPToken.balanceOf(owner.address);
      expect(0).to.equal(ownerBalance);
      const mintCount = BigInt(10000 * base18);
      await hardhatLPToken.connect(owner).mint(owner.address, mintCount);
      ownerBalance = await hardhatLPToken.balanceOf(owner.address);
      console.log('ownerBalance', ownerBalance);
      expect(mintCount).to.equal(ownerBalance);
    });
  });

});