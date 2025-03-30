const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  profile_pic: {
    type: String
  },
  socketId: {
    type: String
  },
  isOnline: {
    type: Boolean
  }
});

module.exports = mongoose.model('User', UserSchema);
