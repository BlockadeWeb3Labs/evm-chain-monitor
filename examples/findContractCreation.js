let log = require('loglevel');
log.setDefaultLevel('trace');

let config = require('./config.js');
let EthereumClient = require('../src/Ethereum/EthereumClient.js');

// Create a chain configuration object
const eth_config = {
	"endpoint" : config.chain.ethereum_rinkeby.endpoint
};

// Create a new monitor instance
let client = new EthereumClient(eth_config);

client.getBlock("6466910", async function(error, block) {
	if (error) {
		log.error("Error retrieving block:", error);
		process.exit();
	}

	log.info(`Block is ${block.number}, found ${block.transactions.length} transactions`);

	// Determine if there are any contract creations
	for (let idx = 0; idx < block.transactions.length; idx++) {
		if (!block.transactions[idx].to) {
			let tx = await client.getTransactionReceipt(block.transactions[idx].hash);
			log.info(tx.transactionIndex + ": " + tx.transactionHash);
			log.info("Contract Address: " + tx.contractAddress);
		}
	}

	process.exit();
});
