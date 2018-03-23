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

// mongoose.connect(MONGODB_URI);

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
  res.send(`Found & deleted ${tokensCnt} tokens named ${nm}`);
})

app.use('/', express.static('logs'), serveIndex('logs', { 'icons': true }))
app.listen(process.env.PORT || 3000)

https.get("https://crypto-ponzi-bot.herokuapp.com/");
setInterval(function () {
  https.get("https://crypto-ponzi-bot.herokuapp.com/");
}, 300000);

// const etherNaughtsShipsGrabber = require('./contracts/ether-naughts-ships');

const burnup = require('./contracts/burnup-io');

let testMode = false;

testMode = true;

burnup();


// cryptoPornstarsGrabber({ testMode, requestRate: 500, buyMaxLimitOverride: 0.21 });
