const contractParser = require('../contract-parser');

const ethers = require('ethers');

const { utils /* , providers */ } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"implementsERC721","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"setGoldenCardToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cardTokenToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_id","type":"uint256"}],"name":"createToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractBalance","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCard","outputs":[{"name":"name","type":"string"},{"name":"token","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"NAME","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"takeOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"goldenTokenId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"priceOf","outputs":[{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cardTokenToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newHost","type":"address"}],"name":"setHost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"hostAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchase","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"SYMBOL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"adminAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"owner","type":"address"}],"name":"NewToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldPrice","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"},{"indexed":false,"name":"prevOwner","type":"address"},{"indexed":false,"name":"winner","type":"address"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"NewTokenOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"goldenPayment","type":"uint256"}],"name":"NewGoldenToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"}]');
const contractAddress = '0x90b12b97a52451f38090f49bce8bc2962dde4902';
const buyMaxLimit = 0.025;

const getTokensNum = async contract => (await contract.totalSupply()).toString();

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const priceData = await contract.priceOf(tokenId);
  let tokenData = {};
  try {
    tokenData = await contract.getCard(tokenId);
  } catch (e) {
    // do nothing;
  }
  const price = priceData.price._bn;
  const formattedPrice = +utils.formatEther(price);
  return {
    ...tokenData,
    formattedPrice,
    price,
    tokenId,
  };
};

const buyToken = async (contract, tokenData) => {
  const { tokenId, price } = tokenData;
  const txn = await contract.purchase(tokenId, {
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
  name: 'tokenswar',
  buyMaxLimit,
});
