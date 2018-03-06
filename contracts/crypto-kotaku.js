const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"GetGamestatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_videoGameId","type":"uint256"}],"name":"getVideoGameDetails","outputs":[{"name":"videoGameName","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"currentPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"videoGameName","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"currentPrice","type":"uint256"}],"name":"addVideoGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_videoGameId","type":"uint256"}],"name":"purchaseVideoGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_videoGameId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"modifyCurrentVideoGamePrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_videoGameId","type":"uint256"}],"name":"getVideoGameOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_videoGameId","type":"uint256"}],"name":"getVideoGameCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unPauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
const contractAddress = '0xdec14d8f4da25108fd0d32bf2decd9538564d069';
const buyMaxLimit = 0.011;

const getTokensNum = async (contract) => {
  let maxTokenId = 0;
  const tokenCount = await Token.count({ name: 'cryptokotaku' });
  if (tokenCount) {
    maxTokenId = tokenCount;
  }
  const discoverNewTokens = async () => {
    try {
      await getTokenData({ tokenId: maxTokenId + 1, contract });
      maxTokenId += 1;
      await discoverNewTokens();
    } catch (e) {
      // do nothing;
    }
  };

  await discoverNewTokens();
  return maxTokenId;
};

const getTokenData = async (params) => {
  const { tokenId, contract } = params;
  const tokenData = await contract.getVideoGameDetails(tokenId);
  const price = tokenData.currentPrice._bn;
  const owner = tokenData.ownerAddress;
  const formattedPrice = +utils.formatEther(price);
  return {
    formattedPrice,
    ...tokenData,
    owner,
    tokenId,
  };
};

const buyToken = async (contract, tokenData) => {
  const { tokenId, currentPrice } = tokenData;
  const txn = await contract.purchaseVideoGame(tokenId, {
    value: currentPrice,
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
  name: 'cryptokotaku',
  buyMaxLimit,
});
