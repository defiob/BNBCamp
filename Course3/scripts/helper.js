const fs = require('fs');

exports.readAddressList = function () {
    return JSON.parse(fs.readFileSync("address.json", "utf-8"));
};

exports.storeAddressList = function (addressList) {
    fs.writeFileSync("address.json", JSON.stringify(addressList, null, "\t"));
};

exports.getLPTokenAddress = function (network) {
    const addressList = exports.readAddressList();
    return addressList[network].LPToken;
};

exports.storeLPTokenAddress = function (network, address) {
    const addressList = exports.readAddressList();
    addressList[network].LPToken = address;
    exports.storeAddressList(addressList);
};

exports.getRewardTokenAddress = function (network) {
    const addressList = exports.readAddressList();
    return addressList[network].RewardToken;
};

exports.storeRewardTokenAddress = function (network, address) {
    const addressList = exports.readAddressList();
    addressList[network].RewardToken = address;
    exports.storeAddressList(addressList);
};

exports.getMasterChefAddress = function (network) {
    const addressList = exports.readAddressList();
    return addressList[network].MasterChef;
};

exports.storeMasterChefAddress = function (network, address) {
    const addressList = exports.readAddressList();
    addressList[network].MasterChef = address;
    exports.storeAddressList(addressList);
};