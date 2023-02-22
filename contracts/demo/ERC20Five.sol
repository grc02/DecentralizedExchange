// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Five is ERC20 {
    constructor() ERC20("Five Token", "FIVE") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
