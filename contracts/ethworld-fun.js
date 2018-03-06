const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"tokenExists","outputs":[{"name":"_exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getRentOwed","outputs":[{"name":"owed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchaseCountry","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"approvedFor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastPurchase","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_price","type":"uint256"}],"name":"calculatePoolCut","outputs":[{"name":"_poolCut","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"countryData","outputs":[{"name":"startingPrice","type":"uint256"},{"name":"price","type":"uint256"},{"name":"lastPrice","type":"uint256"},{"name":"payout","type":"uint256"},{"name":"withdrawn","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOf","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"withdrawRent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"poolTotal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_itemIds","type":"uint256[]"},{"name":"_prices","type":"uint256[]"},{"name":"_payouts","type":"uint256[]"},{"name":"_owners","type":"address[]"}],"name":"createMultiple","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_payoutPercentage","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createListing","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCountryData","outputs":[{"name":"_owner","type":"address"},{"name":"_startingPrice","type":"uint256"},{"name":"_price","type":"uint256"},{"name":"_nextPrice","type":"uint256"},{"name":"_payout","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"devOwed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"updatePayout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_tokenId","type":"uint256"},{"indexed":true,"name":"_owner","type":"address"},{"indexed":false,"name":"_purchasePrice","type":"uint256"}],"name":"CountryPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_approved","type":"address"},{"indexed":false,"name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"}]');
const contractAddress = '0x0c507d48c0cd1232b82aa950d487d01cfc6442db';
const buyMaxLimit = 0.051;
// const buyMaxLimit = 0.08;
const getTokensNum = async contract => (await contract.totalSupply()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getCountryData(tokenId);
  const price = tokenData._price._bn;
  const owner = tokenData._owner;
  const formattedPrice = +utils.formatEther(price);
  return {
    formattedPrice,
    ...tokenData,
    owner,
    tokenId,
  };
};

const buyToken = async (contract, tokenData) => {
  const { tokenId, _price } = tokenData;
  const txn = await contract.purchaseCountry(tokenId, {
    value: _price,
  });
  return txn;
};

const funcs = {
  getTokenData,
  getTokensNum,
  buyToken,
};

const badTokenIds = [0];

module.exports = contractParser({
  badTokenIds,
  contractAddress,
  contractABI,
  funcs,
  name: 'ethworldfun',
  buyMaxLimit,
});
