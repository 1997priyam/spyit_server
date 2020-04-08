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
    type: String,
    required: true
  },
  duration: {
    type: String,
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('calls', callsSchema);