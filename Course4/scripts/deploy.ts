import { ethers, upgrades, network } from "hardhat";

async function main() {
  console.log('network name:', network.name);

  const Logic1 = await ethers.getContractFactory("Logic1");
  const logic1 = await Logic1.deploy();
  await logic1.deployed();
  console.log(`Deployed Logic1 by ${logic1.deployTransaction.from}`);
  console.log("logic1 deployed to:", logic1.address);
  console.log(`logic1 Transaction hash: ${logic1.deployTransaction.hash}`);
  console.log('---------------------------------------------------------------');

  const MyProxyAdmin = await ethers.getContractFactory("MyProxyAdmin");
  const myProxyAdmin = await MyProxyAdmin.deploy();
  await myProxyAdmin.deployed();
  console.log("myProxyAdmin deployed to:", myProxyAdmin.address);
  console.log(`myProxyAdmin Transaction hash: ${myProxyAdmin.deployTransaction.hash}`);
  console.log('---------------------------------------------------------------');

  const MyProxy = await ethers.getContractFactory("MyProxy");
  const myProxy = await MyProxy.deploy();
  await myProxy.deployed();
  console.log("myProxy deployed to:", myProxy.address);
  console.log(`myProxy Transaction hash: ${myProxy.deployTransaction.hash}`);
  console.log('---------------------------------------------------------------');

  const Logic2 = await ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.deployed();
  console.log(`Deployed Logic2 by ${logic2.deployTransaction.from}`);
  console.log("logic2 deployed to:", logic2.address);
  console.log(`logic2 Transaction hash: ${logic2.deployTransaction.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
