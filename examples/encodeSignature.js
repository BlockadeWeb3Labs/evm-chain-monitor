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

// Get the event signature to watch in logs
let text = 'Transfer(address,address,uint256)';
let sig = client.encodeEventSignature(text);
log.info(text + ": " + sig);
