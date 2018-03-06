const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  formattedPrice: Number,
  tokenId: Number,
  name: String,
  tokenData: mongoose.Schema.Types.Mixed,
});

tokenSchema.index({ name: 1, tokenId: 1 });

module.exports = mongoose.model('Token', tokenSchema);
