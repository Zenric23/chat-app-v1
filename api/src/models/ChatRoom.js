const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
