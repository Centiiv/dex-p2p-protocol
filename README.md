# P2P Payment Network on EVM-Compatible Blockchains

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
INFURA_PROJECT_ID=<Your_Infura_Project_ID>
PRIVATE_KEY=<Your_Private_Key>
LIQUIDITY_PROVIDER_URL=https://your-liquidity-provider.com/api


4. Compile and deploy the smart contract:
truffle compile
truffle migrate --network <network-name>
Replace <network-name> with development, ropsten, or any other configured network.

- Usage
Start the backend server:
npm start

- Initiate a transaction: Use a REST client like Postman to send a POST request to http://localhost:3000/initiate with the following JSON body:
{
    "recipient": "<recipient-address>",
    "amount": 100
}
- Monitor transactions: The backend service will automatically monitor and finalize transactions.

- Testing
Run tests using Mocha:
npm test

- Deployment
The contract can be deployed to any EVM-compatible blockchain using Truffle.

- Truffle Configuration
Truffle is configured in truffle-config.js to deploy contracts to various networks. Ensure you have a valid Infura project ID and private key set up in the .env file for deploying to testnets or mainnets.

License
This project is licensed under the MIT License.