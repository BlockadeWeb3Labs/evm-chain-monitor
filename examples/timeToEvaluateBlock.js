let log = require('loglevel');
log.setDefaultLevel('trace');

let config = require('./config.js');
let EthereumClient = require('../index.js').EthereumClient;

// Create a chain configuration object
const eth_config = {
	"endpoint" : config.chain.ethereum_mainnet.endpoint
};

// Get the start time
let start_time = Date.now();

// Create a new monitor instance
let client = new EthereumClient(eth_config);

client.getBlock("10090639", async function(error, block) {
	if (error) {
		log.error("Error retrieving block:", error);
		process.exit();
	}

	log.info(`Block is ${block.number}, found ${block.transactions.length} transactions`);

	for (let idx = 0; idx < block.transactions.length; idx++) {
		let tx = await client.getTransactionReceipt(block.transactions[idx].hash);
		log.info(tx.transactionIndex + ": " + tx.transactionHash);
	}

	let time_elapsed = (Date.now() - start_time) / 1000;
	let time_per_tx  = (time_elapsed / block.transactions.length);

	log.info("Time to finish: " + time_elapsed + " s; Average time per transaction: " + time_per_tx + " s");
	process.exit();
});
