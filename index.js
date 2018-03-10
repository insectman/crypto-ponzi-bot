const mongoose = require('mongoose');
const fs = require('fs');
const Token = require('./token.model');
const Transaction = require('./transaction.model');
const env = require('node-env-file');
const https = require("https");

const express = require('express')
const serveIndex = require('serve-index')
const app = express()

const envPath = __dirname + '/.env';

if (fs.existsSync(envPath)) {
  env(envPath);
}

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

// const commands = {};

app.use('/deltxns', async (req, res) => {
  const { nm } = req.query
  if (!nm) {
    res.send('invalid params')
  };
  const transactionsCnt = await Transaction.count({ name: nm });
  await Transaction.deleteMany({ name: nm });
  // commands[`deltxns-${nm}`] = true;
  res.send(`Found & deleted ${transactionsCnt} transactions named ${nm}`);
})

app.use('/deltkns', async (req, res) => {
  const { nm } = req.query
  if (!nm) {
    res.send('invalid params')
  };
  const tokensCnt = await Token.count({ name: nm });
  await Token.deleteMany({ name: nm });
  res.send(`Found & deleted ${tokensCnt} transactions named ${nm}`);
})

app.use('/', express.static('logs'), serveIndex('logs', { 'icons': true }))
app.listen(process.env.PORT || 3000)

https.get("https://crypto-ponzi-bot.herokuapp.com/");
setInterval(function () {
  https.get("https://crypto-ponzi-bot.herokuapp.com/");
}, 300000);

const cryptoSportsGrabber = require('./contracts/crypto-sports');
const cryptoMoviesGrabber = require('./contracts/crypto-movies');
const cryptoArtsGrabber = require('./contracts/crypto-arts');
const cryptoGitGrabber = require('./contracts/crypto-git');
const cryptoLandmarksGrabber = require('./contracts/crypto-landmarks');
const cryptoMasterpiecesGrabber = require('./contracts/crypto-masterpieces');
const cryptocitiEsGrabber = require('./contracts/cryptociti-es');
const cryptoPornstarsGrabber = require('./contracts/crypto-pornstars');
const cryptoTubersGrabber = require('./contracts/crypto-tubers');
const kpopGrabber = require('./contracts/kpop-io');
const cryptoKiddyToysGrabber = require('./contracts/crypto-kiddytoys');
const etherSoccerGrabber = require('./contracts/ether-soccer');
// const cryptoPizzaGrabber = require('./contracts/crypto-pizza');
const kingLovinGrabber = require('./contracts/king-lovin');
const cryptoEmperorsGrabber = require('./contracts/crypto-emperors');
// const etherEstatesGrabber = require('./contracts/ether-estates');
const etherWaifusGrabber = require('./contracts/ether-waifus');
const cryptoTGrabber = require('./contracts/crypto-t');
const metaGameGrabber = require('./contracts/meta-game');
const cryptoBurritoGrabber = require('./contracts/crypto-burrito');
const cryptoKittensGrabber = require('./contracts/crypto-kittens');
const etherGemsGrabber = require('./contracts/ether-gems');
const cryptoMemesGrabber = require('./contracts/crypto-memes');
const cryptoStampsGrabber = require('./contracts/crypto-stamps');
const cryptoYouCollectGrabber = require('./contracts/crypto-youcollect');
const tokensWarGrabber = require('./contracts/tokens-war');
const cryptoPoliticiansGrabber = require('./contracts/crypto-politicians');
const cryptoWaifusGrabber = require('./contracts/crypto-waifus');
const cryptoHeroGrabber = require('./contracts/crypto-hero');
const cryptoMayorGrabber = require('./contracts/crypto-mayor');
const etherWordsGrabber = require('./contracts/ether-words');
const emojiBlockchainGrabber = require('./contracts/emoji-blockchain');
const cryptoEmojiGrabber = require('./contracts/crypto-emoji');
const etherCodeGrabber = require('./contracts/ether-code');
const bitGalleryGrabber = require('./contracts/bit-gallery');
const cryptoSuperheroesGrabber = require('./contracts/crypto-superheroes');
const cryptoSocialmediaGrabber = require('./contracts/crypto-socialmedia');
const cryptoAvGrabber = require('./contracts/crypto-av');
const etherVillainsGrabber = require('./contracts/ether-villains');
const ethworldFunGrabber = require('./contracts/ethworld-fun');
const cryptoCelebritiesGrabber = require('./contracts/crypto-celebrities');

const etherArkGrabber = require('./contracts/ether-ark');
const etherIslandsGrabber = require('./contracts/ether-islands');
const etherAthletesGrabber = require('./contracts/ether-athletes');
const mobSquadsGrabber = require('./contracts/mob-squads');
const etherCitiesGrabber = require('./contracts/ether-cities');
const etherDrugs69BlazeitGrabber = require('./contracts/etherdrugs-69blazeit');
const cryptoPhonesGrabber = require('./contracts/crypto-phones');
const cryptoWatchesGrabber = require('./contracts/crypto-watches');
const cryptoAlchemyGrabber = require('./contracts/crypto-alchemy');

let testMode = false;

cryptoAlchemyGrabber({ testMode, requestRate: 3000, buyMaxLimitOverride: 0.011 });
cryptoPornstarsGrabber({ testMode, requestRate: 500, buyMaxLimitOverride: 0.21 });
etherIslandsGrabber({ testMode, requestRate: 500, buyMaxLimitOverride: 0.11 });
mobSquadsGrabber({ testMode, buyMaxLimitOverride: 0.025 });
etherCitiesGrabber({ testMode, buyMaxLimitOverride: 0.017 });
cryptoMasterpiecesGrabber({ testMode, buyMaxLimitOverride: 0.03 });
// cryptocitiEsGrabber({ testMode });
etherDrugs69BlazeitGrabber({ testMode, buyMaxLimitOverride: 0.009 });
etherAthletesGrabber({ testMode, buyMaxLimitOverride: 0.011 });
cryptoPhonesGrabber({ testMode, buyMaxLimitOverride: 0.011 });
cryptoWatchesGrabber({ testMode, buyMaxLimitOverride: 0.011 });
etherArkGrabber({ testMode, debugOn: false, buyMaxLimitOverride: 0.06 });

testMode = true;



/*
// cryptoHeroGrabber({ testMode, buyMaxLimitOverride: 0.005 });
ethworldFunGrabber({ testMode, buyMaxLimitOverride: 0.051 });
metaGameGrabber({ testMode });
cryptoSportsGrabber({ testMode, buyMaxLimitOverride: 0.011 });
cryptoMoviesGrabber({ testMode, buyMaxLimitOverride: 0.011 });
kingLovinGrabber({ testMode, buyMaxLimitOverride: 0.001 });
// cryptoEmperorsGrabber({ testMode, buyMaxLimitOverride: 0.001 });
etherWaifusGrabber({ testMode, buyMaxLimitOverride: 0.04 });
cryptoGitGrabber({ testMode });
cryptoArtsGrabber({ testMode, buyMaxLimitOverride: 0.03 });
cryptoLandmarksGrabber({ testMode, buyMaxLimitOverride: 0.02 });
// cryptoKiddyToysGrabber({ testMode, buyMaxLimitOverride: 0.011 });
// cryptoTubersGrabber({ testMode, buyMaxLimitOverride: 0.002 });
kpopGrabber({ testMode, buyMaxLimitOverride: 0.07 });
etherSoccerGrabber({ testMode, buyMaxLimitOverride: 0.01 });
cryptoTGrabber({ testMode, requestRate: 500, buyMaxLimitOverride: 0.01 });
cryptoBurritoGrabber({ testMode });
// cryptoKittensGrabber({ testMode });
// etherGemsGrabber({ testMode });
cryptoMemesGrabber({ testMode });
cryptoYouCollectGrabber({ testMode });
cryptoPoliticiansGrabber({ testMode, buyMaxLimitOverride: 0.044 });
cryptoWaifusGrabber({ testMode, buyMaxLimitOverride: 0.025 });
cryptoMayorGrabber({ testMode, buyMaxLimitOverride: 0.013 });
// etherWordsGrabber({ testMode, buyMaxLimitOverride: 0.0009 });
emojiBlockchainGrabber({ testMode, buyMaxLimitOverride: 0.025 });
cryptoEmojiGrabber({ testMode, buyMaxLimitOverride: 0.002 });
etherCodeGrabber({ testMode, buyMaxLimitOverride: 0.01 });
bitGalleryGrabber({ testMode, buyMaxLimitOverride: 0.002 });
cryptoSuperheroesGrabber({ testMode, buyMaxLimitOverride: 0.01 });
cryptoSocialmediaGrabber({ testMode, buyMaxLimitOverride: 0.0095 });
cryptoAvGrabber({ testMode, buyMaxLimitOverride: 0.022 });
etherVillainsGrabber({ testMode, buyMaxLimitOverride: 0.0361 });
tokensWarGrabber({
  testMode,
  buyMaxLimitOverride: 0.011,
  requestRate: 3000,
  debugOn: false,
});
cryptoCelebritiesGrabber({ testMode, buyMaxLimitOverride: 0.051 });

*/

/*


*/

/*
// cryptoPizzaGrabber({ testMode, buyMaxLimitOverride: 0.005 });
// etherEstatesGrabber({ testMode, buyMaxLimitOverride: 0.05 });

testMode = true;

cryptoStampsGrabber({ testMode, buyMaxLimitOverride: -1 });


(async () => {
  const TransactionCnt = await Transaction.count({});
  console.log('TransactionCnt count:', TransactionCnt);
  const TokenCnt = await Token.count({});
  console.log('TokenCnt count:', TokenCnt);
})();

*/
