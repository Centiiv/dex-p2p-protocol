const express = require('express');
const app = express();
const { setupEventListener } = require('./eventListener');

require('dotenv').config();
app.use(express.json());

// Endpoint to initiate a transaction
app.post('/initiate', async (req, res) => {
  const { recipient, amount } = req.body;

  try {
    const txHash = await contract.receiveStablecoins(recipient, amount);
    res.status(200).json({ txHash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server and listen for events
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setupEventListener();
});
