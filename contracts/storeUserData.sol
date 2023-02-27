// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;

contract UserStorageData {
    struct Transactions {
        address caller;
        address poolAddress;
        address tokenAddress0;
        address tokenAddress1;
    }

    Transactions[] transactions;

    function addTransaction(address poolAddress, address tokenAddress0, address tokenAddress1) public {
        transactions.push(Transactions(msg.sender, poolAddress, tokenAddress0, tokenAddress1));
    }

    function getAllTransactions() public view returns (Transactions[] memory) {
        return transactions;
    }
}
