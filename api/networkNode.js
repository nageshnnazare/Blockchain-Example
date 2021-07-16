const express = require('express');
const bodyParser = require('body-parser');
const { v1: uuidv1 } = require('uuid');

const Blockchain = require('../app/blockchain');

const PORT = 5500;

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

	res.json({ note: 'New block mined successfully', block: newBlock });
});

app.listen(PORT, () => {
	console.log('Listening on port : ' + PORT);
});
