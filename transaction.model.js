const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'fail', 'success'],
  },
  name: String,
  tokenId: String,
  price: Number,
  formattedPrice: Number,
});

module.exports = mongoose.model('Transaction', transactionSchema);
