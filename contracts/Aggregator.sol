// SPDX-License-Identifier: MIT
pragma solidity v0.8.25;

contract Aggregator {
    enum TransactionStatus { Pending, Completed, Failed }

    struct Transaction {
        address sender;
        address recipient;
        uint256 amount;
        TransactionStatus status;
        uint256 timestamp;
    }

    mapping(bytes32 => Transaction) public transactions;

    event LiquidityProviderTriggered(bytes32 indexed txHash);

    function receiveStablecoins(
        address recipient,
        uint256 amount
    ) external returns (bytes32) {
        bytes32 txHash = keccak256(
            abi.encodePacked(msg.sender, recipient, amount, block.number)
        )

        transactions[txHash] = Transaction({
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            status: TransactionStatus.Pending,
            timestamp: block.number
        });

        emit LiquidityProviderTriggered(txHash);
        return txHash;
    }

    function finalizeTransaction(
        bytes32 txHash,
        bool success
    ) external {
        Transaction storage tx = transactions[txHash];
        require(tx.status == TransactionStatus.Pending, "Transaction not pending");

        if (success) {
            tx.status = TransactionStatus.Completed;
        } else {
            tx.status = TransactionStatus.Failed;
        }
    }
}
