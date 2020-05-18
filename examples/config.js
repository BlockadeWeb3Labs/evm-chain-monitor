require('dotenv').config();

module.exports = {
	chain : {
		ethereum_rinkeby : {
			'type'      : "Ethereum",
			'name'      : "Ethereum Rinkeby",
			'endpoint'  : "https://rinkeby.infura.io/v3/" + process.env.INFURA_KEY,
			'read_url'  : "",
			'write_url' : "",
			'chain_id'  : "*"
		},
		ethereum_mainnet : {
			'type'      : "Ethereum",
			'name'      : "Ethereum",
			'endpoint'  : "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY,
			'read_url'  : "",
			'write_url' : "",
			'chain_id'  : "*"
		}
	}
};
