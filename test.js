const ethers = require('ethers');
const Transaction = require('./transaction.model');
const Token = require('./token.model');

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cryptobot');

const { utils /* , providers */ } = ethers;
const { myWallet } = require('./mywallet');

const contractABI = JSON.parse('[{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_elementId","type":"uint256"}],"name":"priceOfElement","outputs":[{"name":"_price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdrawAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbols","type":"bytes32[]"}],"name":"addElements","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_itemId","type":"uint256"}],"name":"nextPriceOfElement","outputs":[{"name":"_nextPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"bytes32"}],"name":"addElement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"}],"name":"addAuthorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getElement","outputs":[{"name":"symbol","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_elementIds","type":"uint256[]"}],"name":"getElementOwners","outputs":[{"name":"owners","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elementToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_elementIds","type":"uint256[]"}],"name":"getElements","outputs":[{"name":"elementsData","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_elementIds","type":"uint256[]"}],"name":"priceOfElements","outputs":[{"name":"_prices","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getElementView","outputs":[{"name":"symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"currentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_authorized","type":"address"}],"name":"removeAuthorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_itemId","type":"uint256"}],"name":"getElementInfo","outputs":[{"name":"_owner","type":"address"},{"name":"_price","type":"uint256"},{"name":"_nextPrice","type":"uint256"},{"name":"_symbol","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_itemId","type":"uint256"}],"name":"getElementInfoView","outputs":[{"name":"_owner","type":"address"},{"name":"_price","type":"uint256"},{"name":"_nextPrice","type":"uint256"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elementToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorized","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"indexFrom","type":"uint32"},{"name":"count","type":"uint32"}],"name":"getElementsFromIndex","outputs":[{"name":"elementsData","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tableSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_itemId","type":"uint256"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_price","type":"uint256"}],"name":"calculateNextPrice","outputs":[{"name":"_nextPrice","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elements","outputs":[{"name":"symbol","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newSize","type":"uint256"}],"name":"setTableSize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"elementId","type":"uint256"},{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name":"Sold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"atomicNumber","type":"uint256"},{"indexed":false,"name":"symbol","type":"bytes32"}],"name":"Create","type":"event"}]');
const contractAddress = '0x548D32216D01617452892eA360bFCE9cE8dc9729';
// const buyMaxLimit = 0.02;
// const buyMaxLimit = 0.243;

const contract = new ethers.Contract(contractAddress, contractABI, myWallet);

// const gasLimitFormatted = 290000;
// const gasUnitPrice = 4;

// const gasLimit = utils.bigNumberify(gasLimitFormatted);
const gasLimit = 130000;
const gasPrice = 4000000;


(async () => {


const txn = await contract.buy(69, {
    value: utils.parseEther('0.001'),
    gasLimit,
    // gasPrice,
  });

  // await Transaction.deleteMany({ name: 'metaquazr' });
  // await Transaction.deleteMany({});
  // await Transaction.deleteMany({ name: 'cryptophones' });
  console.log(txn);
  console.log('ok');
  // await Transaction.deleteMany({ name: 'cryptomayor' });

  // const total = await _contract.totalSupply();

  // const tokensCnt = await Token.count({});
  // const transactionsCnt = await Transaction.count({ name: 'cryptociti-es' });
  // const tokensCnt = await Token.count({ name: 'kinglovin'});
  // const tokensCnt1 = await Token.count({ name: 'cryptoemperors'});
  // console.log(transactionsCnt);
})();
