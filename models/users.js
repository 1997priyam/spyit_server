const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  }, 
  url: {
      type: String
  }
});

module.exports = mongoose.model('users', usersSchema);