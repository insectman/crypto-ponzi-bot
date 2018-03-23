const ethers = require('ethers');

const { utils } = ethers;
const { myWallet } = require('../mywallet');

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"totalPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gameSettings","outputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_deedName","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"coordinateToIdentifier","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nextGameSettings","outputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gameIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"price","type":"uint256"}],"name":"nextBuyoutPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawPayments","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_identifier","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"identifier","type":"uint256"}],"name":"identifierToCoordinate","outputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"startNewGameIfIdle","type":"bool"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"},{"name":"referrerAddress","type":"address"}],"name":"buyoutAndSetReferrer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"startNewGameIfIdle","type":"bool"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"buyout","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_deedSymbol","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gameStates","outputs":[{"name":"gameStarted","type":"bool"},{"name":"gameStartTimestamp","type":"uint256"},{"name":"lastFlippedTile","type":"uint256"},{"name":"prizePool","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"validCoordinate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_identifier","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"name":"setNextGameSettings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"payments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"message","type":"string"}],"name":"spiceUp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"burnupHoldingAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"deedId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rows","type":"uint256"},{"indexed":false,"name":"cols","type":"uint256"},{"indexed":false,"name":"activityTimer","type":"uint256"},{"indexed":false,"name":"unclaimedTilePrice","type":"uint256"},{"indexed":false,"name":"buyoutReferralBonusPercentage","type":"uint256"},{"indexed":false,"name":"buyoutPrizePoolPercentage","type":"uint256"},{"indexed":false,"name":"buyoutDividendPercentage","type":"uint256"},{"indexed":false,"name":"buyoutFeePercentage","type":"uint256"}],"name":"NextGame","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"starter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"prizePool","type":"uint256"},{"indexed":false,"name":"rows","type":"uint256"},{"indexed":false,"name":"cols","type":"uint256"},{"indexed":false,"name":"activityTimer","type":"uint256"},{"indexed":false,"name":"unclaimedTilePrice","type":"uint256"},{"indexed":false,"name":"buyoutReferralBonusPercentage","type":"uint256"},{"indexed":false,"name":"buyoutPrizePoolPercentage","type":"uint256"},{"indexed":false,"name":"buyoutDividendPercentage","type":"uint256"},{"indexed":false,"name":"buyoutFeePercentage","type":"uint256"}],"name":"Start","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"winner","type":"address"},{"indexed":true,"name":"identifier","type":"uint256"},{"indexed":false,"name":"x","type":"uint256"},{"indexed":false,"name":"y","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"prize","type":"uint256"}],"name":"End","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"identifier","type":"uint256"},{"indexed":false,"name":"x","type":"uint256"},{"indexed":false,"name":"y","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"timeoutTimestamp","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"},{"indexed":false,"name":"newPrizePool","type":"uint256"}],"name":"Buyout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"spicer","type":"address"},{"indexed":false,"name":"spiceAdded","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"newPrizePool","type":"uint256"}],"name":"SpiceUpPrizePool","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]');
const contractAddress = '0x1f58af89d12d4a60647f99a9fc71dd0367b56df4';
                          
const contract = new ethers.Contract(contractAddress, contractABI, myWallet);

module.exports = params => ((options = {}) => {

  let { requestRate } = options;
  if (!requestRate) {
    requestRate = 2000;
  }

  // const ids = {};
  let memTransactions = {};
  let rows = null;
  let cols = null;
  let gameIndex = null;
  let gameState = null;
  let gameSettings = null;
  let isNewGame = true;

  const getGameIndex = async () => {
    const newGameIndex = (await contract.gameIndex()).toString();
    if(!gameIndex) {
      console.log('starting gameIndex', newGameIndex);
    }
    if(gameIndex && gameIndex !== newGameIndex) {
      console.log('newGameIndex', newGameIndex);
      isNewGame = false;
    }
    gameIndex = newGameIndex;
    if (!gameSettings || gameIndex !== newGameIndex) {
      memTransactions = {};
      await getGameSettings(gameIndex);
    }
  }

  const getGameState = async () => {
    if (!gameIndex) {
      await getGameIndex();
    }
    gameState = await contract.gameStates(gameIndex);
  }

  const getGameSettings = async () => {
    gameSettings = await contract.gameSettings(gameIndex);
    cols = gameSettings.cols.toString();
    rows = gameSettings.rows.toString();
    rows = 4;
    cols = 4;
  }

  let repeatableFn = async () => {
    if (!gameState) {
      await getGameState();
    }

    if (!gameState.gameStarted || isNewGame) {
      return;
    }

    Promise.all(Array.from({ length: cols * rows }, (x, i) => i).map(async (i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      if (memTransactions[x] && memTransactions[x][y]) {
        return;
      }

      if (typeof memTransactions[x] === 'undefined') {
        memTransactions[x] = {};
      }

      memTransactions[x][y] = true;
      try {
        let price = 0.021;
        if (x !== 0 && x !== cols - 1 && y !== 0 && y !== rows - 1) {
          price = 0.031;
        }
        console.log(x, y, price);
        
        await contract.buyout(gameIndex, false, x, y, {
          value: utils.parseEther(price.toString()),
          gasLimit: 200000,
          gasPrice: 2260000000,
        });
        
      } catch (e) {
        if(e.code && e.code == -32000) {
          console.log('underpriced');
        } else {
          console.log(e);
          memTransactions[x][y] = false;
        }
      }

    }));
  }

  // setInterval(() => memTransactions = {}, 10000);

  repeatableFn();
  setInterval(repeatableFn, requestRate);
  setInterval(getGameIndex, requestRate);
  setInterval(getGameState, requestRate);
})();
