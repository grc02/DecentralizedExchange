// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Four is ERC20 {
    constructor() ERC20("Four Token", "FOUR") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
