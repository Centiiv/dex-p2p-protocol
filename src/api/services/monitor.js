const { contract } = require('../api/config');

async function monitorTransactions() {
  const pendingTransactions = await contract.getPendingTransactions();
  const currentTime = Date.now();

  for (let tx of pendingTransactions) {
    if (currentTime - tx.timestamp > MAX_ALLOWED_TIME) {
      await contract.finalizeTransaction(tx.hash, false);
    }
  }
}

setInterval(monitorTransactions, MONITOR_INTERVAL);
