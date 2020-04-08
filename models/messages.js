const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('messages', messagesSchema);