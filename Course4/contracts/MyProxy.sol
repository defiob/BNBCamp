// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract MyProxy {
    // bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
    bytes32 constant IMPL_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
    // bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1)
    bytes32 constant ADMIN_SLOT =
        0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

    constructor() {
        _setAdmin(msg.sender);
        // _setImplementation(_logic);
    }

    modifier onlyAdmin() {
        require(msg.sender == _getAdmin(), "Not authorized");
        _;
    }

    function _getAdmin() private view returns (address admin) {
        assembly {
            admin := sload(ADMIN_SLOT)
        }
    }

    function _setAdmin(address _admin) private {
        require(_admin != address(0), "admin = zero address");
        assembly {
            sstore(ADMIN_SLOT, _admin)
        }
    }

    function _getImplementation() internal view returns (address impl) {
        assembly {
            impl := sload(IMPL_SLOT)
        }
    }

    function _setImplementation(address _logicContract) internal {
        assembly {
            sstore(IMPL_SLOT, _logicContract)
        }
    }

    function changeAdmin(address _admin) external onlyAdmin {
        _setAdmin(_admin);
    }

    function admin() external view onlyAdmin returns (address admin) {
        assembly {
            admin := sload(ADMIN_SLOT)
        }
    }

    function implementation() external view returns (address) {
        return _getImplementation();
    }

    function upgradeTo(address _implementation) external onlyAdmin {
        _setImplementation(_implementation);
    }

    function _delegate(address implementation) internal virtual {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(
                gas(),
                implementation,
                0,
                calldatasize(),
                0,
                0
            )

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    fallback() external {
        _delegate(_getImplementation());
    }
}
