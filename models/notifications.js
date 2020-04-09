const mongoose = require('mongoose')

const notificationsSchema = new mongoose.Schema({
  app: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ticker: {
    type: String
  },
  ts: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true
  },
  bigText: {
    type: String
  }
});

module.exports = mongoose.model('notifications', notificationsSchema);