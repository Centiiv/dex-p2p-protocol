const { contract } = require('./config');
const { triggerLiquidityProvider } = require('./triggerLiquidityProvider');

async function setupEventListener() {
  contract.on('LiquidityProviderTriggered', async (txHash) => {
    try {
      const tx = await contract.transactions(txHash);
      await triggerLiquidityProvider(tx.recipient, tx.amount);
      await contract.finalizeTransaction(txHash, true);
    } catch (error) {
      console.error('Error handling event:', error);
      await contract.finalizeTransaction(txHash, false);
    }
  });
}

module.exports = { setupEventListener };
