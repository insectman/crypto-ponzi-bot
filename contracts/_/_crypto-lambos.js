const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"getLambosCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_model","type":"string"},{"name":"_price","type":"uint256"},{"name":"_enabled","type":"bool"}],"name":"addLambo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lambos","outputs":[{"name":"model","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"price","type":"uint256"},{"name":"enabled","type":"bool"},{"name":"nickname","type":"string"},{"name":"note","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"enableLambo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_nickname","type":"string"},{"name":"_note","type":"string"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"}],"name":"destroyAndSend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"model","type":"string"},{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"nickname","type":"string"},{"indexed":false,"name":"note","type":"string"}],"name":"Bought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"model","type":"string"},{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"enabled","type":"bool"}],"name":"Added","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"Enabled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]');
const contractAddress = '0xe824055fefA7bEB658A8656D32cA48D658Cd6D3B';
const buyMaxLimit = 0.031;
// const buyMaxLimit = 0.243;

const getTokensNum = async contract => (await contract.getLambosCount()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getMasterpiece(tokenId);
  const price = tokenData.sellingPrice._bn;
  // const owner = tokenData._owner;
  const formattedPrice = +utils.formatEther(price);
  return {
    formattedPrice,
    ...tokenData,
    // owner,
    tokenId,
  };
};

const buyToken = async (contract, tokenData) => {
  const { tokenId, price } = tokenData;
  const txn = await contract.buy(tokenId, {
    value: price,
  });
  return txn;
};

const funcs = {
  getTokenData,
  getTokensNum,
  buyToken,
};

module.exports = contractParser({
  contractAddress,
  contractABI,
  funcs,
  name: 'cryptolambos',
  buyMaxLimit,
});
