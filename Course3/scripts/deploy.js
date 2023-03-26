const { network } = require("hardhat");

const base18 = 10 ** 18;
const splitStr = '----------------------------------------------------------------------------------';

async function main() {
    console.log('network name:', network.name);

    const LPToken = await ethers.getContractFactory("LPToken");
    const lpToken = await LPToken.deploy();
    await lpToken.deployed();

    console.log(`Deployed LPToken by ${lpToken.deployTransaction.from}`);
    console.log(`Deployed LPToken to: ${lpToken.address}`);
    console.log(`LPToken Transaction hash: ${lpToken.deployTransaction.hash}`);
    console.log(splitStr);

    const MasterChef = await ethers.getContractFactory("MasterChef");
    const masterChef = await MasterChef.deploy(BigInt(100 * base18), 0, 0);
    await masterChef.deployed();
    console.log(`Deployed MasterChef by ${masterChef.deployTransaction.from}`);
    console.log(`Deployed MasterChef to: ${masterChef.address}`);
    console.log(`MasterChef Transaction hash: ${masterChef.deployTransaction.hash}`);
    console.log('MasterChef rewardPerBlock', await masterChef.rewardPerBlock());
    console.log('MasterChef startBlock', await masterChef.startBlock());
    console.log('MasterChef bonusEndBlock', await masterChef.bonusEndBlock());
    console.log(splitStr);

    const RewardToken = await ethers.getContractFactory("RewardToken");
    const rewardToken = await RewardToken.deploy(masterChef.address);
    await rewardToken.deployed();
    console.log(`Deployed RewardToken by ${rewardToken.deployTransaction.from}`);
    console.log(`Deployed RewardToken to: ${rewardToken.address}`);
    console.log(`RewardToken Transaction hash: ${rewardToken.deployTransaction.hash}`);
    console.log(splitStr);
}

(async () => {
    await main();
})();