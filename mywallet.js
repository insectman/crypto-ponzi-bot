const ethers = require('ethers');
const fs = require('fs');
const env = require('node-env-file');
// const { Wallet, /* utils, */ providers } = ethers;
const { Wallet, utils, providers } = ethers;

const provider = providers.getDefaultProvider('mainnet');

const envPath = __dirname + '/.env';

if (fs.existsSync(envPath)) {
  env(envPath);
}

const { walletAddress, privateKey } = process.env;

const wallet = new Wallet(privateKey, provider);

/*
const transaction = {

  nonce: 1,
  // gasLimit: wallet.provider.estimateGas,

  gasLimit: 21000,
  gasPrice: utils.bigNumberify('20000000000'),

  // to: '0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290',

  data: '0x',

  value: ethers.utils.parseEther('0.000103'),

  // chaindId: providers.Provider.chainId.homestead
};

const signedTransaction = wallet.sign(transaction);
*/

/*
providers.getDefaultProvider('ropsten').sendTransaction(signedTransaction).then((hash) => {
});
*/

module.exports = {
  getBalance: async () => {
    const balance = await wallet.getBalance();
    return balance;
  },
  myWallet: wallet,
  walletAddress,
};
