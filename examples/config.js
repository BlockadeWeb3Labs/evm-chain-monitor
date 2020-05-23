require('dotenv').config();

let rinkeby_endpoint, mainnet_endpoint;
if (process.env.RINKEBY_ENDPOINT) {
	rinkeby_endpoint = process.env.RINKEBY_ENDPOINT;
} else {
	rinkeby_endpoint = "https://rinkeby.infura.io/v3/" + process.env.INFURA_KEY;
}

if (process.env.MAINNET_ENDPOINT) {
	mainnet_endpoint = process.env.MAINNET_ENDPOINT;
} else {
	mainnet_endpoint = "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY;
}

module.exports = {
	chain : {
		ethereum_rinkeby : {
			'type'      : "Ethereum",
			'name'      : "Ethereum Rinkeby",
			'endpoint'  : rinkeby_endpoint,
			'read_url'  : "",
			'write_url' : "",
			'chain_id'  : "*"
		},
		ethereum_mainnet : {
			'type'      : "Ethereum",
			'name'      : "Ethereum",
			'endpoint'  : mainnet_endpoint,
			'read_url'  : "",
			'write_url' : "",
			'chain_id'  : "*"
		}
	}
};
