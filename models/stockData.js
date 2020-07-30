const mongoose = require('mongoose')

const stockDataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('stockData', stockDataSchema);