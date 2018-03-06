const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"getTeam","outputs":[{"name":"name","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"curPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_playerId","type":"uint256"}],"name":"purchasePlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"getTeamOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_countryId","type":"uint256"}],"name":"purchaseCountry","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"InitiateTeams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_playerId","type":"uint256"}],"name":"getPlayerOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_teamId","type":"uint256"}],"name":"getTeamPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GetIsPauded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_playerId","type":"uint256"}],"name":"getPlayerPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"address1","type":"address"},{"name":"price","type":"uint256"},{"name":"realTeamId","type":"uint256"}],"name":"addPlayer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_teamId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"modifyPriceCountry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_playerId","type":"uint256"}],"name":"getPlayer","outputs":[{"name":"name","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"curPrice","type":"uint256"},{"name":"realTeamId","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unPauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
const contractAddress = '0x01293CD77F68341635814C35299Ed30Ae212789e';
const buyMaxLimit = 0.044;
// const buyMaxLimit = 0.529;

const getTokensNum = async contract => (await contract.totalSupply()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getPolitician(tokenId);
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
  const { tokenId, sellingPrice } = tokenData;
  const txn = await contract.purchase(tokenId, {
    value: sellingPrice,
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
  name: 'etherbasketball',
  buyMaxLimit,
});
