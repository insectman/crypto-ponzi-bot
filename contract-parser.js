const ethers = require('ethers');
const { myWallet, getBalance, walletAddress } = require('./mywallet');
const Transaction = require('./transaction.model');
const Token = require('./token.model');
const fs = require('fs');
const os = require('os');

const contractParserFactory = (params) => {
  let tokensNum = null;
  const memTokens = {};
  const memTokensCheck = (tokenId) => {
    if (memTokens[tokenId] && memTokens[tokenId] > getTokenMaxPrice(tokenId)) {
      return false;
    }
    return true;
  }
  const memTransactions = {};
  // let requestNum = 0;
  let { buyMaxLimit } = params;
  const {
    contractAddress,
    contractABI,
    name,
    funcs,
    badTokenIds,
  } = params;
  const logFile = `./logs/${name}.log`;
  const errorLogFile = `./logs/${name}.error.log`;
  const {
    getTokensNum,
    getTokenIds,
    getTokenData,
    buyToken,
  } = funcs;
  let { getTokenMaxPrice } = funcs;
  if (!getTokenMaxPrice) {
    getTokenMaxPrice = () => buyMaxLimit;
  }

  const logError = (e, fnName) => {
    if (!e.responseText) {
      console.log(`${name} ${fnName}:`);
      console.log(e);
    }
    fs.appendFileSync(errorLogFile, `${fnName}:`);
    fs.appendFileSync(errorLogFile, os.EOL);
    fs.appendFileSync(errorLogFile, new Date());
    fs.appendFileSync(errorLogFile, os.EOL);
    fs.appendFileSync(errorLogFile, JSON.stringify(e));
    fs.appendFileSync(errorLogFile, os.EOL);
  };

  const logMsg = (msg, fnName) => {
    console.log(`${name} ${fnName}:`);
    console.log(msg);
    fs.appendFileSync(logFile, `${fnName}:`);
    fs.appendFileSync(logFile, os.EOL);
    fs.appendFileSync(logFile, new Date());
    fs.appendFileSync(logFile, os.EOL);
    fs.appendFileSync(logFile, msg);
    fs.appendFileSync(logFile, os.EOL);
  };

  const contract = new ethers.Contract(contractAddress, contractABI, myWallet);
  return async (options) => {
    const { testMode, buyMaxLimitOverride, debugOn } = options;
    if (buyMaxLimitOverride) {
      buyMaxLimit = buyMaxLimitOverride;
    }
    let tokenIds;
    let buyableTokens;
    let newTokensNum;
    try {
      newTokensNum = +(await getTokensNum(contract));
    } catch (e) {
      // console.log(e);
      logError(e, 'getTokensNum');
      return;
    }

    if (!tokensNum) {
      const str = `${name} tokensNum started at ${newTokensNum}`;
      logMsg(str, 'numStart');
    } else if (tokensNum !== newTokensNum) {
      if (!newTokensNum) {
        return;
      }
      const str = `${name} tokensNum changed to ${newTokensNum}`;
      logMsg(str, 'numChange');
    }
    tokensNum = newTokensNum;

    try {
      if (getTokenIds) {
        tokenIds = await getTokenIds(contract, tokensNum);
      } else {
        tokenIds = Array.from({ length: tokensNum }, (x, i) => i);
      }
      if (badTokenIds) {
        tokenIds = tokenIds.filter(e => !badTokenIds.includes(e));
      }
    } catch (e) {
      logError(e, 'getTokenIds');
      return;
    }

    const purchaseBuyabletoken = async (tokenData) => {
      if (!tokenData.owner || tokenData.owner === walletAddress) {
        return;
      }
      const { tokenId, formattedPrice } = tokenData;
      if (memTransactions[`${tokenId}_${formattedPrice}`]) {
        return;
      }
      const transaction = await Transaction.findOne({ name, tokenId, formattedPrice });
      if (!transaction) {
        try {
          if (memTransactions[`${tokenId}_${formattedPrice}`]) {
            return;
          }
          memTransactions[`${tokenId}_${formattedPrice}`] = true;
          let str = `${name} buying  token № ${tokenId} at ${tokenData.formattedPrice}`;
          logMsg(str, 'buyToken');
          await (new Transaction({ name, tokenId, formattedPrice })).save();
          if (testMode) {
            return;
          }
          if (await getBalance() < formattedPrice) {
            logMsg(`insufficient funds - ${await getBalance()} of ${formattedPrice}`, 'insFunds');
            return;
          }
          const txn = await buyToken(contract, {
            gasLimit: 200000,
            // gasPrice: 4000000,
            ...tokenData,
          });
          logMsg(`${JSON.stringify(tokenData)}${os.EOL}${JSON.stringify(txn)}`, 'buyToken');
        } catch (e) {
          memTransactions[`${tokenId}_${formattedPrice}`] = false;
          await Transaction.findOneAndRemove({ name, tokenId, formattedPrice });
          logError(e, 'buyToken');
        }
      } else {
        memTransactions[`${tokenId}_${formattedPrice}`] = true;
      }
    }

    await Promise.all(tokenIds.map(async (tokenId) => {
      let dbToken = null;
      try {
        if (typeof memTokens[tokenId] === 'undefined') {
          dbToken = await Token.findOne({ name, tokenId });
          if (dbToken) {
            memTokens[tokenId] = +dbToken.formattedPrice;
          }
        }

        if(!memTokensCheck(tokenId)) {
          return null;
        }

        const tokenData = await getTokenData({ tokenId, contract });
        if (debugOn) {
          console.log('getTokenData:', tokenData);
        }

        if(!memTokensCheck(tokenId)) {
          return null;
        }
        
        const formattedPrice = +tokenData.formattedPrice;
        memTokens[tokenId] = formattedPrice;
        dbToken = await Token.findOne({ name, tokenId });

        if(!memTokensCheck(tokenId)) {
          return null;
        }

        if (!dbToken) {
          await (new Token({
            name,
            tokenId,
            formattedPrice,
            tokenData,
          })).save();
        } else {
          dbToken.formattedPrice = formattedPrice;
          // dbToken.tokenData = tokenData;
          await dbToken.save();
        }

        if(!memTokensCheck(tokenId)) {
          return null;
        }

        await purchaseBuyabletoken(tokenData);
      } catch (e) {
        logError(e, 'getTokenData');
        return null;
      }
    }));

    /*
    if (!buyableTokens || !buyableTokens.length) {
      return;
    }
    */

    // logMsg(buyableTokens.length, 'buyableTokensCount');

    /*
    console.log(name, buyableTokens.length, tokenIds.length,
      buyableTokens.map(e => `${e.tokenId}:${e.formattedPrice}`));
    */

    // await Promise.all(buyableTokens.map());
  };
};

module.exports = params => (() => {
  let contractParserFn = contractParserFactory(params);
  return (options) => {
    let { requestRate } = options;
    if (!requestRate) {
      requestRate = 1000;
    }
    contractParserFn = contractParserFn.bind(null, options);
    contractParserFn();
    setInterval(contractParserFn, requestRate);
  };
})();
