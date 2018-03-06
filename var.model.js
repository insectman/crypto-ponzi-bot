const mongoose = require('mongoose');

const varSchema = new mongoose.Schema({
  val: String,
  name: String,
});

module.exports = mongoose.model('Var', varSchema);
