// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

/**
 * @title Aggregator
 * @dev This contract handles the receiving and finalizing of stablecoin transactions.
 */
contract Aggregator {
    /// @dev Enum representing the status of a transaction.
    enum TransactionStatus { Pending, Completed, Failed }

    /**
     * @dev Struct representing a transaction.
     * @param sender The address initiating the transaction.
     * @param recipient The address receiving the transaction amount.
     * @param amount The amount of stablecoins being transacted.
     * @param status The current status of the transaction.
     * @param timestamp The block number when the transaction was initiated.
     */
    struct Transaction {
        address sender;
        address recipient;
        uint256 amount;
        TransactionStatus status;
        uint256 timestamp;
    }

    /// @dev Mapping from transaction hash to transaction details.
    mapping(bytes32 => Transaction) public transactions;

    /**
     * @dev Emitted when a liquidity provider is triggered by a new transaction.
     * @param trxHash The hash of the transaction that triggered the liquidity provider.
     */
    event LiquidityProviderTriggered(bytes32 indexed trxHash);

    /**
     * @notice Receives stablecoins and creates a transaction entry.
     * @param recipient The address to receive the stablecoins.
     * @param amount The amount of stablecoins being transacted.
     * @return txHash The hash of the newly created transaction.
     */
    function receiveStablecoins(
        address recipient,
        uint256 amount
    ) external returns (bytes32) {
        bytes32 trxHash = keccak256(
            abi.encodePacked(msg.sender, recipient, amount, block.number)
        );

        transactions[trxHash] = Transaction({
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            status: TransactionStatus.Pending,
            timestamp: block.number
        });

        emit LiquidityProviderTriggered(trxHash);
        return trxHash;
    }

    /**
     * @notice Finalizes a transaction by marking it as completed or failed.
     * @param trxHash The hash of the transaction to finalize.
     * @param success A boolean indicating if the transaction was successful.
     * @dev The transaction status must be `Pending` for it to be finalized.
     */
    function finalizeTransaction(
        bytes32 trxHash,
        bool success
    ) external {
        Transaction storage trx = transactions[trxHash];
        require(trx.status == TransactionStatus.Pending, "Transaction not pending");

        if (success) {
            trx.status = TransactionStatus.Completed;
        } else {
            trx.status = TransactionStatus.Failed;
        }
    }
}
