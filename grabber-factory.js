const moment = require('moment');
const request = require('request-async');
// const cheerio = require('cheerio');

const Transaction = require('./transaction.model');

const checkTransaction = async (data) => {
  const { name, tokenId, price } = data;
  const transaction = await Transaction.findOne({ name, tokenId, price });
  return !transaction;
};

const addTransaction = async (data) => {
  await (new Transaction(data)).save();
};

const analyzeBodyFactory = ((callbacks, buyMaxLimit) => {
  let totalTokensNum = null;
  let minPrice = null;
  const { parseBody, getTokenData, prepareTransactions } = callbacks;
  return async (params) => {
    const { body, lastPrice } = params;
    // const $ = cheerio.load(body);
    let tokensData = null;
    // const curTokensNum = $('.grid-item').length;
    const { tokenIds } = parseBody(body);
    const curTokensNum = tokenIds.length;
    // if (true) {
    if (curTokensNum !== totalTokensNum) {
      totalTokensNum = curTokensNum;
      /*
      const tokenIds = $('.grid-item p[id]').map((i, el) => +$(el).attr('id'))
        .get().filter(e => e);
        */
      tokensData = (await Promise.all(tokenIds.map(async tokenId =>
        getTokenData(tokenId))))
        .filter(e => e && e.formattedPrice && e.formattedPrice <= buyMaxLimit);

      if (tokensData.length) {
        minPrice = tokensData.reduce((min, token) =>
          Math.min(min, token.formattedPrice), Infinity);
        const transactions = await prepareTransactions(tokensData, {
          checkTransaction,
          addTransaction,
        });
      } else {
        minPrice = lastPrice;
      }
    }
    return { minPrice, tokensData };
  };
});

module.exports = params => (() => {
  let lastPrice = null;
  const contractsInProcess = {};
  let response;
  const {
    headers,
    postData,
    url,
    name,
    callbacks,
    buyMaxLimit,
  } = params;
  const analyzeBodyFunc = analyzeBodyFactory(callbacks, buyMaxLimit);
  const func = async () => {
    try {
      let options = {
        json: true,
      };
      if (headers) {
        options = {
          ...options,
          headers,
        };
      }
      if (postData) {
        options = {
          ...options,
          form: postData,
        };
        response = await request.post(url, options);
      } else {
        response = await request(url, options);
      }
      const { minPrice } = await analyzeBodyFunc({
        body: response.body,
        lastPrice,
        contractsInProcess,
      });

    } catch (e) {
    }
  };

  return () => {
    func();
    setInterval(func, 1500);
  };
})();
