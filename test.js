const ethers = require('ethers');
const Transaction = require('./transaction.model');
const Token = require('./token.model');

const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/cryptobot');

const { utils /* , providers */ } = ethers;
const { myWallet } = require('./mywallet');

const contractABI = JSON.parse('[{"constant":true,"inputs":[],"name":"totalPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gameSettings","outputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_deedName","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"reclaimToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"coordinateToIdentifier","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nextGameSettings","outputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gameIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"price","type":"uint256"}],"name":"nextBuyoutPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawPayments","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_identifier","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"identifier","type":"uint256"}],"name":"identifierToCoordinate","outputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"startNewGameIfIdle","type":"bool"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"},{"name":"referrerAddress","type":"address"}],"name":"buyoutAndSetReferrer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"startNewGameIfIdle","type":"bool"},{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"buyout","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_deedSymbol","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gameStates","outputs":[{"name":"gameStarted","type":"bool"},{"name":"gameStartTimestamp","type":"uint256"},{"name":"lastFlippedTile","type":"uint256"},{"name":"prizePool","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"uint256"},{"name":"y","type":"uint256"}],"name":"validCoordinate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_identifier","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"rows","type":"uint256"},{"name":"cols","type":"uint256"},{"name":"activityTimer","type":"uint256"},{"name":"unclaimedTilePrice","type":"uint256"},{"name":"buyoutReferralBonusPercentage","type":"uint256"},{"name":"buyoutPrizePoolPercentage","type":"uint256"},{"name":"buyoutDividendPercentage","type":"uint256"},{"name":"buyoutFeePercentage","type":"uint256"}],"name":"setNextGameSettings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"payments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gameIndex","type":"uint256"},{"name":"message","type":"string"}],"name":"spiceUp","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"burnupHoldingAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"deedId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"rows","type":"uint256"},{"indexed":false,"name":"cols","type":"uint256"},{"indexed":false,"name":"activityTimer","type":"uint256"},{"indexed":false,"name":"unclaimedTilePrice","type":"uint256"},{"indexed":false,"name":"buyoutReferralBonusPercentage","type":"uint256"},{"indexed":false,"name":"buyoutPrizePoolPercentage","type":"uint256"},{"indexed":false,"name":"buyoutDividendPercentage","type":"uint256"},{"indexed":false,"name":"buyoutFeePercentage","type":"uint256"}],"name":"NextGame","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"starter","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"prizePool","type":"uint256"},{"indexed":false,"name":"rows","type":"uint256"},{"indexed":false,"name":"cols","type":"uint256"},{"indexed":false,"name":"activityTimer","type":"uint256"},{"indexed":false,"name":"unclaimedTilePrice","type":"uint256"},{"indexed":false,"name":"buyoutReferralBonusPercentage","type":"uint256"},{"indexed":false,"name":"buyoutPrizePoolPercentage","type":"uint256"},{"indexed":false,"name":"buyoutDividendPercentage","type":"uint256"},{"indexed":false,"name":"buyoutFeePercentage","type":"uint256"}],"name":"Start","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"winner","type":"address"},{"indexed":true,"name":"identifier","type":"uint256"},{"indexed":false,"name":"x","type":"uint256"},{"indexed":false,"name":"y","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"prize","type":"uint256"}],"name":"End","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"identifier","type":"uint256"},{"indexed":false,"name":"x","type":"uint256"},{"indexed":false,"name":"y","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"timeoutTimestamp","type":"uint256"},{"indexed":false,"name":"newPrice","type":"uint256"},{"indexed":false,"name":"newPrizePool","type":"uint256"}],"name":"Buyout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"gameIndex","type":"uint256"},{"indexed":true,"name":"spicer","type":"address"},{"indexed":false,"name":"spiceAdded","type":"uint256"},{"indexed":false,"name":"message","type":"string"},{"indexed":false,"name":"newPrizePool","type":"uint256"}],"name":"SpiceUpPrizePool","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]');
const contractAddress = '0x1f58af89d12d4a60647f99a9fc71dd0367b56df4';

const contract = new ethers.Contract(contractAddress, contractABI, myWallet);

// const gasLimitFormatted = 290000;
// const gasUnitPrice = 4;

// const gasLimit = utils.bigNumberify(gasLimitFormatted);
const gasLimit = 130000;
const gasPrice = 4000000;


(async () => {

  // const tt = await contract.nextGameSettings();
  const tt = await contract.gameIndex();
  // const tt = (await contract.gameStates(12));
  // const tt = (await contract.gameStates(12)[]);

  console.log(tt.toString());


  // dbTokens.forEach(dbToken => console.log(dbToken.tokenId));

  // const tt = await await Token.findOne({id: 1000, name: 'cryptociti-es'});
  // console.log(tt);

  // console.log(utils.formatEther(utils.parseEther('0.25')));
  /*
    const maxCity = await Token.findOne({
      tokenId: { $lte: 999 },
    })
      .sort('-tokenId')
      .exec();
  
    const maxCountry = await Token.findOne({
      tokenId: { $gt: 999 },
    })
      .sort('-tokenId')
      .exec();
  
    let maxCityId = maxCity ? maxCity.tokenId : 0;
    let maxCountryId = maxCountry ? maxCountry.tokenId : 999;
  
    let td = await contract.getToken(maxCityId + 1);
    if (td.cityName.length) {
      maxCityId = maxCityId + 1;
    }
    td = await contract.getToken(maxCountryId + 1);
    if (td.tokenName.length) {
      maxCountryId = maxCityId + 1;
    }
  
    // const tt = await Token.find({ name: 'cryptociti-es' });
    // console.log(maxCityId, maxCountryId);
  
    console.log(maxCityId, maxCountryId);
    
      const txn = await contract.buy(69, {
        value: utils.parseEther('0.001'),
        gasLimit,
        // gasPrice,
      });
    */
  // await Transaction.deleteMany({ name: 'metaquazr' });
  // await Transaction.deleteMany({});
  // await Transaction.deleteMany({ name: 'cryptophones' });
  // console.log(txn);
  // console.log('ok');
  // await Transaction.deleteMany({ name: 'cryptomayor' });

  // const total = await _contract.totalSupply();

  // const tokensCnt = await Token.count({});
  // const transactionsCnt = await Transaction.count({ name: 'cryptociti-es' });
  // const tokensCnt = await Token.count({ name: 'kinglovin'});
  // const tokensCnt1 = await Token.count({ name: 'cryptoemperors'});
  // console.log(transactionsCnt);
})();
