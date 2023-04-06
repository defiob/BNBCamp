import { ethers, upgrades, network } from "hardhat";

async function main() {
  console.log('network name:', network.name);
  const signers = await ethers.getSigners();
  console.log('signer0=', signers[0].address);
  const Logic1 = await ethers.getContractFactory("Logic1");
  const logic1 = await Logic1.attach('0x8Cc06090c99A2FB40098e717663BA239F33ECF84');
  console.log('logic1 version:', await logic1.VERSION());
  console.log('logic1 initialized:', await logic1.initialized());
  console.log('logic1 value:', await logic1.value());
  console.log('---------------------------------------------------------------');

  const MyProxy = await ethers.getContractFactory("MyProxy");
  const myProxy = await MyProxy.attach('0xE104A7C0478dFEc41ad7BD59D244118C354173ab');
  console.log('myProxy implementation', await myProxy.implementation()); // logic2 address = 0x24cB9928540107f345230e561C6b017Bd9037c45
  console.log('---------------------------------------------------------------');

  const Logic2 = await ethers.getContractFactory("Logic1");
  const logic2FromProxy = Logic2.attach(myProxy.address);
  console.log('logic2FromProxy value', await logic2FromProxy.value());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
