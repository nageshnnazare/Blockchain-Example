const express = require('express');
const bodyParser = require('body-parser');
const { v1: uuidv1 } = require('uuid');
const rp = require('request-promise');

const Blockchain = require('../app/blockchain');

const PORT = process.argv[2];

const nodeAddress = uuidv1().split('-').join('');

const app = express();
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', (req, res) => {
	res.send(bitcoin);
});

app.post('/transaction', (req, res) => {
	const blockIndex = bitcoin.createNewTransaction(
		req.body.amount,
		req.body.sender,
		req.body.recipient
	);
	res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

app.get('/mine', (req, res) => {
	const lastBlock = bitcoin.getLastBlock();
	const prevBlockHash = lastBlock['hash'];
	const currBlockData = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock['index'] + 1,
	};

	const nonce = bitcoin.proofOfWork(prevBlockHash, currBlockData);

	const blockHash = bitcoin.hashBlock(prevBlockHash, currBlockData, nonce);

	// Mining Reward
	bitcoin.createNewTransaction(12.5, '00', nodeAddress);

	const newBlock = bitcoin.createNewBlock(nonce, prevBlockHash, blockHash);

	res.json({ note: `New block mined successfully`, block: newBlock });
});

app.post('/register-and-broadcast-node', (req, res) => {
	const newNodeURL = req.body.newNodeURL;
	if (bitcoin.networkNodes.indexOf(newNodeURL) == -1) {
		bitcoin.networkNodes.push(newNodeURL);
	}

	const regNodesPromises = [];

	bitcoin.networkNodes.forEach((networkNodeURL) => {
		const requestOptions = {
			uri: networkNodeURL + '/register-node',
			method: 'POST',
			body: {
				newNodeURL: newNodeURL,
			},
			json: true,
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
		.then((data) => {
			const bulkRegisterOptions = {
				uri: newNodeURL + '/register-nodes-bulk',
				method: 'POST',
				body: {
					allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeURL],
				},
				json: true,
			};

			return rp(bulkRegisterOptions);
		})
		.then((data) => {
			res.json({ note: `New Node registered with network successfully` });
		});
});

app.post('/register-node', (req, res) => {
	const newNodeURL = req.body.newNodeURL;
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeURL) == -1;
	const notCurrentNode = bitcoin.currentNodeURL != newNodeURL;
	if (nodeNotAlreadyPresent && notCurrentNode) {
		bitcoin.networkNodes.push(newNodeURL);
	}

	res.json({ note: `New Node registered succesfully` });
});

app.post('/register-nodes-bulk', (req, res) => {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach((networkNodeUrl) => {
		const nodeNotAlreadyPresent =
			bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeURL != networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) {
			bitcoin.networkNodes.push(networkNodeUrl);
		}
	});

	res.json({ note: `Bulk registration successful` });
});

app.listen(PORT, () => {
	console.log('Listening on port : ' + PORT);
});
