const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
