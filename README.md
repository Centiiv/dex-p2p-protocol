# Decentralized P2P Payment Network on EVM-Compatible Blockchains

This project implements a decentralized P2P payment network on multiple EVM-compatible blockchain networks using Solidity for the smart contract and Node.js for the backend. The system allows users to send stablecoins to an aggregator smart contract, which then communicates with a liquidity provider to disburse the equivalent amount in fiat currency to a settlement bank account.

## Project Structure
p2p-payment-network-evm/
│
├── contracts/
│   └── Aggregator.sol
│
├── migrations/
│   └── 1_deploy_contract.js
│
├── scripts/
│   └── deploy.js
│
├── src/
│   └── api/
│       ├── index.js
│       ├── config.js
│       ├── eventListener.js
│       ├── triggerLiquidityProvider.js
│   └── services/
│       └── monitor.js
│
├── test/
│   └── Aggregator.test.js
│
├── .env
├── truffle-config.js
├── package.json
└── README.md

Prerequisites
Node.js and npm installed
Truffle framework installed
Ganache (or access to a testnet/mainnet)
MetaMask or other Ethereum-compatible wallet

1. Clone repository
git clone <repository-url>
cd p2p-payment-network-evm

2. Install dependencies:
npm install

3. Set up environment variables: Create a .env file in the root directory with the following content:
NETWORK_RPC_URL_SEPOLIA= 
NETWORK_RPC_URL_MAINNET= 
PRIVATE_KEY= 
ETHERSCAN_API_KEY= 


4. Compile and deploy the smart contract:
    "build": "npx hardhat compile",
    "deploy-sepolia": " npx hardhat ignition deploy ./ignition/modules/aggregator.js --network sepolia",
    "deploy-mainnet": " npx hardhat ignition deploy ./ignition/modules/aggregator.js --network mainnet",
    "deploy-sepolia-verify": " npx hardhat ignition deploy ./ignition/modules/aggregator.js --network sepolia --verify",
    "deploy-mainnet-verify": " npx hardhat ignition deploy ignition/modules/aggregator.js --network mainnet --verify",
    npm run build
    npm run deploy-sepolia-verify
 

- Usage
Start the backend server:
npm start

- Initiate a transaction: Use a REST client like Postman to send a POST request to http://localhost:3000/initiate with the following JSON body:
{
    "recipient": "<recipient-address>",
    "amount": 100
}
- Monitor transactions: The backend service will automatically monitor and finalize transactions.

 

- Deployment
The contract can be deployed to any EVM-compatible blockchain using hardhat.

 
 
## License

All rights reserved. Unauthorized use, distribution, or modification of this code is strictly prohibited.
This software is the property of Centiiv Technologies LTD. Any use of this software requires a license from Centiiv Technologies LTD.
For inquiries about obtaining a license, please contact hello@centiiv.com.