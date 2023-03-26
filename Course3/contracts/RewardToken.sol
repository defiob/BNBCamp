// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, ERC20Burnable, Ownable {
    address public masterChefContract;

    constructor(address _masterChefContract) ERC20("Reward Token", "RWT") {
        require(
            _masterChefContract != address(0),
            "Error! masterChefContract cannot be zero address"
        );
        masterChefContract = _masterChefContract;
    }

    modifier onlyMasterChef() {
        require(masterChefContract == _msgSender(), "Error, not masterChef");
        _;
    }

    function updateMasterChefContract(
        address _masterChefContract
    ) external onlyOwner {
        require(
            _masterChefContract != address(0),
            "Error! masterChefContract cannot be zero address"
        );
        require(
            _masterChefContract != masterChefContract,
            "Error! masterChefContract address is the same as the old one"
        );
        masterChefContract = _masterChefContract;
    }

    function mint(address to, uint256 amount) public onlyMasterChef {
        _mint(to, amount);
    }
}
