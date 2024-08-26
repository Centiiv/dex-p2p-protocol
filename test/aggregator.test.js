const { expect } = require('chai');

describe('Aggregator', function () {
  let aggregator;

  before(async function () {
    const Aggregator = await ethers.getContractFactory('Aggregator');
    aggregator = await Aggregator.deploy();
    await aggregator.deployed();
  });

  it('should receive stablecoins', async function () {
    const [sender, recipient] = await ethers.getSigners();
    const txHash = await aggregator.receiveStablecoins(recipient.address, 100);
    expect(txHash).to.be.ok;
  });

  it('should finalize a transaction', async function () {
    const [sender, recipient] = await ethers.getSigners();
    const txHash = await aggregator.receiveStablecoins(recipient.address, 100);
    await aggregator.finalizeTransaction(txHash, true);

    const tx = await aggregator.transactions(txHash);
    expect(tx.status).to.equal(1); // 1 for Completed
  });
});
