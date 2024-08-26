const axios = require('axios');

async function triggerLiquidityProvider(recipient, amount) {
  try {
    const response = await axios.post(process.env.LIQUIDITY_PROVIDER_URL, {
      recipient,
      amount,
    });

    if (response.status !== 200) {
      throw new Error('Liquidity provider call failed');
    }
  } catch (error) {
    console.error('Error calling liquidity provider:', error);
    throw error;
  }
}

module.exports = { triggerLiquidityProvider };
