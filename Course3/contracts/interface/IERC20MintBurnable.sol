// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20MintBurnable is IERC20 {
    /// @notice  Destroys `amount` tokens from the caller.
    /// @param amount The amount of burn token
    function burn(uint256 amount) external;

    /// @notice  Destroys `amount` tokens from `account`, deducting from the caller's allowance.
    /// @param account The account of burn token
    /// @param amount The amount of burn token
    function burnFrom(address account, uint256 amount) external;

    /// @notice Mint `amount` tokens to `account`.
    /// @notice Only callable by an address that currently has the admin role.
    /// @param account The account of mint token
    /// @param amount The amount of mint token
    function mint(address account, uint256 amount) external;
}
