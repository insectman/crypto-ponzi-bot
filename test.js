const ethers = require('ethers');
const Transaction = require('./transaction.model');
const Token = require('./token.model');

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cryptobot');

const { utils /* , providers */ } = ethers;
const { myWallet } = require('./mywallet');

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"promoCreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"implementsERC721","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getPerson","outputs":[{"name":"personName","type":"string"},{"name":"sellingPrice","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_name","type":"string"},{"name":"_price","type":"uint256"}],"name":"createPromoPerson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"createContractPerson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"personIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"NAME","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"personIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"priceOf","outputs":[{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"SYMBOL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"oldPrice","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"},{"indexed":false,"name":"prevOwner","type":"address"},{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"TokenSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"}]');
const contractAddress = '0x286e052bc8250250566683424001ee5224867d91';
// const buyMaxLimit = 0.02;
// const buyMaxLimit = 0.243;

const contract = new ethers.Contract(contractAddress, contractABI, myWallet);

// const gasLimitFormatted = 290000;
// const gasUnitPrice = 4;

// const gasLimit = utils.bigNumberify(gasLimitFormatted);
const gasLimit = 130000;
const gasPrice = 4000000;


(async () => {

  console.log(utils.formatEther(utils.parseEther('0.25')));
/*
  const maxCity = await Token.findOne({
    tokenId: { $lte: 999 },
  })
    .sort('-tokenId')
    .exec();

  const maxCountry = await Token.findOne({
    tokenId: { $gt: 999 },
  })
    .sort('-tokenId')
    .exec();

  let maxCityId = maxCity ? maxCity.tokenId : 0;
  let maxCountryId = maxCountry ? maxCountry.tokenId : 999;

  let td = await contract.getToken(maxCityId + 1);
  if (td.cityName.length) {
    maxCityId = maxCityId + 1;
  }
  td = await contract.getToken(maxCountryId + 1);
  if (td.tokenName.length) {
    maxCountryId = maxCityId + 1;
  }

  // const tt = await Token.find({ name: 'cryptociti-es' });
  // console.log(maxCityId, maxCountryId);

  console.log(maxCityId, maxCountryId);
  
    const txn = await contract.buy(69, {
      value: utils.parseEther('0.001'),
      gasLimit,
      // gasPrice,
    });
  */
  // await Transaction.deleteMany({ name: 'metaquazr' });
  // await Transaction.deleteMany({});
  // await Transaction.deleteMany({ name: 'cryptophones' });
  // console.log(txn);
  // console.log('ok');
  // await Transaction.deleteMany({ name: 'cryptomayor' });

  // const total = await _contract.totalSupply();

  // const tokensCnt = await Token.count({});
  // const transactionsCnt = await Transaction.count({ name: 'cryptociti-es' });
  // const tokensCnt = await Token.count({ name: 'kinglovin'});
  // const tokensCnt1 = await Token.count({ name: 'cryptoemperors'});
  // console.log(transactionsCnt);
})();
