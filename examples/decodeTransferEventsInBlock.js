let log = require('loglevel');
log.setDefaultLevel('trace');

let config = require('./config.js');
let EthereumClient = require('../src/Ethereum/EthereumClient.js');

// Create a chain configuration object
const eth_config = {
	"endpoint" : config.chain.ethereum_mainnet.endpoint
};

// Create a new monitor instance
let client = new EthereumClient(eth_config);

const TransferEvent = {
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "from",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "to",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
	],
	"name": "Transfer",
	"type": "event"
};
const TransferTopic = client.encodeEventSignature(TransferEvent);

client.getBlock("10090639", async function(error, block) {
	if (error) {
		log.error("Error retrieving block:", error);
		process.exit();
	}

	log.info(`Block is ${block.number}, found ${block.transactions.length} transactions`);

	for (let idx = 0; idx < block.transactions.length; idx++) {
		let tx = await client.getTransactionReceipt(block.transactions[idx].hash);

		if (!tx.logs || !tx.logs.length) {
			continue;
		}

		/**
		 * Logs contain the signature + all indexed arguments
		 **/
		for (let logIdx = 0; logIdx < tx.logs.length; logIdx++) {
			if (!tx.logs[logIdx].topics) {
				continue;
			}

			if (tx.logs[logIdx].topics.indexOf(TransferTopic) !== -1) {
				log.info(
					"Transfer event in TX #" + tx.transactionIndex + " of " + 
					block.transactions.length + ": " + tx.transactionHash
				);

				let decodedLog = client.decodeLog(
					TransferEvent.inputs,
					tx.logs[logIdx].data,
					tx.logs[logIdx].topics
				);

				log.info(
					"Decoded: ", decodedLog
				);
			}
		}
	}

	process.exit();
});
