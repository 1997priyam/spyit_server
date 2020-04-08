const mongoose = require('mongoose')

const callsSchema = new mongoose.Schema({
  callType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  duration: {
    type: String,
  }
});

module.exports = mongoose.model('calls', callsSchema);