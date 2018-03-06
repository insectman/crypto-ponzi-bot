const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"_companyId","type":"uint256"},{"name":"adText","type":"string"},{"name":"adLink","type":"string"}],"name":"purchaseAd","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_shareId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"updateSharePrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_companyId","type":"uint256"},{"name":"_type","type":"uint256"}],"name":"getLeastExpensiveShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyShares","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_shareId","type":"uint256"}],"name":"purchaseShare","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_companyName","type":"string"},{"name":"_companyPrice","type":"uint256"}],"name":"createCompany","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_companyId","type":"uint256"}],"name":"getCompany","outputs":[{"name":"name","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"curPrice","type":"uint256"},{"name":"curAdPrice","type":"uint256"},{"name":"curAdText","type":"string"},{"name":"curAdLink","type":"string"},{"name":"shareId","type":"uint256"},{"name":"sharePrice","type":"uint256"},{"name":"volume","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"InitiateCompanies","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_companyId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"updateCompanyPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GetIsPauded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_companyId","type":"uint256"}],"name":"getCompanyShareholders","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"addressSharesCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_shareId","type":"uint256"}],"name":"getShare","outputs":[{"name":"companyId","type":"uint256"},{"name":"ownerAddress","type":"address"},{"name":"curPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_companyId","type":"uint256"}],"name":"purchaseCompany","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"unPauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
const contractAddress = '0xCf3a6eC03b0E8e8525933d4e2439d4D5Ee2763Ce';
const buyMaxLimit = 0.1;
// const buyMaxLimit = 0.529;
const getTokensNum = async contract => (await contract.totalSupply()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getCity(tokenId);
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
  /*
  const m2p = contract.masterpieceToPrice(tokenId);
  console.log(+utils.formatEther(m2p));
  console.log(sellingPrice);
  console.log(m2p);
  */
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
  name: 'wallcryptostreet',
  buyMaxLimit,
});
