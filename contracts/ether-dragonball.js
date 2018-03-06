const contractParser = require('../contract-parser');
// const Var = require('../var.model');
const Token = require('../token.model');
const ethers = require('ethers');

const { utils } = ethers;

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"GetGamestatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_heroId","type":"uint256"}],"name":"getHeroCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_heroId","type":"uint256"}],"name":"getHeroOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_heroId","type":"uint256"}],"name":"getHeroDetails","outputs":[{"name":"heroName","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"currentPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"heroName","type":"string"},{"name":"ownerAddress","type":"address"},{"name":"currentPrice","type":"uint256"}],"name":"addHero","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_heroId","type":"uint256"},{"name":"_newPrice","type":"uint256"}],"name":"modifyCurrentHeroPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_heroId","type":"uint256"}],"name":"purchaseHero","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"unPauseGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
const contractAddress = '0x4727829190b9867f6d01aacfbcbb8271e20c20f2';
const buyMaxLimit = 0.02;
// const buyMaxLimit = 0.243;

const getTokensNum = async (contract) => {
  let maxTokenId = 0;
  const maxToken = await Token.findOne({ name: 'etherdragonball' })
    .sort('-tokenId')
    .exec();
  if (maxToken) {
    maxTokenId = maxToken.tokenId;
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
  const tokenData = await contract.getHeroDetails(tokenId);
  const price = tokenData.currentPrice;
  const owner = tokenData.ownerAddress;
  const formattedPrice = +utils.formatEther(price._bn);
  return {
    formattedPrice,
    ...tokenData,
    price,
    owner,
    tokenId,
  };
};

const buyToken = async (contract, tokenData) => {
  const { tokenId, currentPrice } = tokenData;
  const txn = await contract.purchaseHero(tokenId, {
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
  name: 'etherdragonball',
  buyMaxLimit,
});
