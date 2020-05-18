const Web3 = require('web3');
const log  = require('loglevel');

class EthereumClient {
	constructor(config) {
		this.web3     = null;
		this.endpoint = config.endpoint;

		// Connect off the bat
		this.connect();
	}

	connect() {
		this.web3 = new Web3(this.endpoint);
	}

	getBlock(blockHashOrNumber = "latest", callback = null) {
		return this.web3.eth.getBlock(blockHashOrNumber, true, callback);
	}

	getTransactionReceipt(txHash, callback = null) {
		return this.web3.eth.getTransactionReceipt(txHash, callback);
	}

	encodeEventSignature(textOrJson) {
		return this.web3.eth.abi.encodeEventSignature(textOrJson);
	}

	decodeParameters(parameters, hexString) {
		return this.web3.eth.abi.decodeParameters(parameters, hexString);
	}

	decodeLog(parameters, hexString, topics) {
		return this.web3.eth.abi.decodeLog(parameters, hexString, topics);
	}
}

module.exports = EthereumClient;
