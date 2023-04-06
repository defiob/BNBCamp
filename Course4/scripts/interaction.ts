import { ethers, upgrades, network } from "hardhat";

async function main() {
  console.log('network name:', network.name);

  const Logic1 = await ethers.getContractFactory("Logic1");
  const logic1 = await Logic1.deploy();
  await logic1.deployed();
  console.log(`Deployed Logic1 by ${logic1.deployTransaction.from}`);
  console.log("logic1 deployed to:", logic1.address);
  console.log(`logic1 Transaction hash: ${logic1.deployTransaction.hash}`);
  console.log('logic1 version:', await logic1.VERSION());
  console.log('logic1 initialized:', await logic1.initialized());
  console.log('logic1 value:', await logic1.value());
  await logic1.initialize(1);
  console.log('logic1 initialized:', await logic1.initialized());
  console.log('---------------------------------------------------------------');

  const MyProxyAdmin = await ethers.getContractFactory("MyProxyAdmin");
  const myProxyAdmin = await MyProxyAdmin.deploy();
  await myProxyAdmin.deployed();
  console.log("myProxyAdmin deployed to:", myProxyAdmin.address);
  console.log(`myProxyAdmin Transaction hash: ${myProxyAdmin.deployTransaction.hash}`);
  console.log('---------------------------------------------------------------');


  const MyProxy = await ethers.getContractFactory("MyProxy");
  const myProxy = await MyProxy.deploy(logic1.address);
  await myProxy.deployed();
  console.log("myProxy deployed to:", myProxy.address);
  console.log(`myProxy Transaction hash: ${myProxy.deployTransaction.hash}`);
  // 检查逻辑合约是否成功部署到代理合约中
  const logic1FromProxy = Logic1.attach(myProxy.address);
  console.log('logic1FromProxy value', await logic1FromProxy.value()); // 输出：0
  // 在代理合约上调用逻辑合约的 setValue() 函数
  await logic1FromProxy.setValue(100);
  // 检查代理合约是否成功将请求委托给逻辑合约
  console.log('logic1FromProxy value', await logic1FromProxy.value()); // 输出：110
  console.log('myProxy implementation', await myProxy.implementation()); // logic1 address
  // change admin to myProxyAdmin
  await myProxy.changeAdmin(myProxyAdmin.address);
  console.log('---------------------------------------------------------------');

  const Logic2 = await ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.deployed();
  console.log(`Deployed Logic2 by ${logic2.deployTransaction.from}`);
  console.log("logic2 deployed to:", logic2.address);
  console.log(`logic2 Transaction hash: ${logic2.deployTransaction.hash}`);
  console.log('logic2 version:', await logic2.VERSION());
  console.log('logic2 initialized:', await logic2.initialized());
  console.log('logic2 value:', await logic2.value());
  await logic2.initialize(2);
  console.log('logic2 initialized:', await logic2.initialized());
  console.log('---------------------------------------------------------------');

  await myProxyAdmin.upgrade(myProxy.address, logic2.address);
  console.log('myProxy implementation', await myProxy.implementation()); // logic2 address
  const logic2FromProxy = Logic2.attach(myProxy.address);
  console.log('logic2FromProxy value', await logic2FromProxy.value()); // 输出：110
  await logic2FromProxy.setValue(200);
  console.log('logic2FromProxy value', await logic2FromProxy.value()); // 输出：220
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
