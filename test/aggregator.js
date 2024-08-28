import { expect } from "chai";
import { ethers } from "hardhat";

describe("Aggregator", function () {
  let Aggregator, aggregator, sender, recipient;

  before(async function () {
    Aggregator = await ethers.getContractFactory("Aggregator");
    aggregator = await Aggregator.deploy();
    await aggregator.deployed();

    [sender, recipient] = await ethers.getSigners();
  });

  it("should receive stablecoins and emit an event", async function () {
    const tx = await aggregator.receiveStablecoins(recipient.address, 100);
    const receipt = await tx.wait();
    const event = receipt.events.find(
      (e) => e.event === "LiquidityProviderTriggered"
    );
    const txHash = event.args.txHash;
    expect(txHash).to.be.ok;

    const transaction = await aggregator.transactions(txHash);
    expect(transaction.sender).to.equal(sender.address);
    expect(transaction.recipient).to.equal(recipient.address);
    expect(transaction.amount).to.equal(100);
    expect(transaction.status).to.equal(0); // 0 for Pending
    expect(transaction.timestamp).to.equal(receipt.blockNumber);
  });

  it("should finalize a transaction as completed", async function () {
    const tx = await aggregator.receiveStablecoins(recipient.address, 200);
    const receipt = await tx.wait();
    const event = receipt.events.find(
      (e) => e.event === "LiquidityProviderTriggered"
    );
    const txHash = event.args.txHash;

    await aggregator.finalizeTransaction(txHash, true);
    const transaction = await aggregator.transactions(txHash);
    expect(transaction.status).to.equal(1); // 1 for Completed
  });

  it("should finalize a transaction as failed", async function () {
    const tx = await aggregator.receiveStablecoins(recipient.address, 300);
    const receipt = await tx.wait();
    const event = receipt.events.find(
      (e) => e.event === "LiquidityProviderTriggered"
    );
    const txHash = event.args.txHash;

    await aggregator.finalizeTransaction(txHash, false);
    const transaction = await aggregator.transactions(txHash);
    expect(transaction.status).to.equal(2); // 2 for Failed
  });

  it("should revert when trying to finalize a non-pending transaction", async function () {
    const tx = await aggregator.receiveStablecoins(recipient.address, 400);
    const receipt = await tx.wait();
    const event = receipt.events.find(
      (e) => e.event === "LiquidityProviderTriggered"
    );
    const txHash = event.args.txHash;

    await aggregator.finalizeTransaction(txHash, true);
    await expect(
      aggregator.finalizeTransaction(txHash, true)
    ).to.be.revertedWith("Transaction not pending");
  });
});





