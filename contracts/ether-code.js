const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"implementsERC721","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"codetokenIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_creator","type":"address"}],"name":"setCreator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"NAME","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"priceOf","outputs":[{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCodeToken","outputs":[{"name":"codetokenName","type":"string"},{"name":"sellingPrice","type":"uint256"},{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"createCodeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"SYMBOL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"codetokenIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"Birth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"oldPrice","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"},{"indexed":false,"name":"prevOwner","type":"address"},{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"TokenSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"}]');
const contractAddress = '0x8f223017e0519d54f9395fb01fa37139e54d921f';
const buyMaxLimit = 0.01;
// const buyMaxLimit = 0.529;
const getTokensNum = async contract => (await contract.totalSupply()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getCodeToken(tokenId);
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
  name: 'ethercode',
  buyMaxLimit,
});
