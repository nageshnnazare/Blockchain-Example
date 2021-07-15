const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// Testing createNewBlock() Method
// bitcoin.createNewBlock(2389, 'rgth2y6jh5u6jk5', 'tgt6h56yj56u5j');

// Testing createNewTransaction() Method
// bitcoin.createNewTransaction(101, 'rghy6j5y6j', 'cewd45r6t59t');

// bitcoin.createNewBlock(1225, 'gjujk54i5l4ol', 'ry464h4y6754j897u');
// bitcoin.createNewTransaction(201, ' hryju5k65i6l', 'yjhu8k8i7k548');
// bitcoin.createNewTransaction(501, ' hryju5k65i6l', 'yjhu8k8i7k548');
// bitcoin.createNewTransaction(601, ' hryju5k65i6l', 'yjhu8k8i7k548');

// bitcoin.createNewBlock(1225, 'gjujk54i5l4ol', 'ry464h4y6754j897u');
// console.log(bitcoin.chain[2]);

// Testing hashBlock() Method
// const previousBlockHash = 'def6r5g64t65h46t54jh564yj564';
// const currentBlockData = [
// 	{
// 		amount: 10,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// 	{
// 		amount: 30,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// 	{
// 		amount: 50,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// ];

// const nonce = 101;

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// Testing proofOfWork() Method
// const previousBlockHash = 'def6r5g64t65h46t54jh564yj564';
// const currentBlockData = [
// 	{
// 		amount: 10,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// 	{
// 		amount: 30,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// 	{
// 		amount: 50,
// 		sender: 'wgrth65yjh6y5j',
// 		recipient: 'eferght5hjy5j4',
// 	},
// ];

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

// const myhash = bitcoin.hashBlock(
// 	previousBlockHash,
// 	currentBlockData,
// 	bitcoin.proofOfWork(previousBlockHash, currentBlockData)
// );

// console.log(myhash);

console.log(bitcoin);
