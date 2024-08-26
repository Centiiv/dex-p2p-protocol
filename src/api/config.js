const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.NETWORK_RPC_URL);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  CONTRACT_ABI,
  provider.getSigner()
);

module.exports = { contract };
