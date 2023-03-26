const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("LPToken");
    const contractAddress = "0x3736f5e805833ee1fb5041057e71bc94ee431cd6";
    const contract = await Contract.attach(contractAddress);

    console.log("Contract verified on address:", contractAddress);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
