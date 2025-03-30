const mongoose = require('mongoose');
const { MessageTypes } = require('../constants/messageConstants');

const MessageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recieverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
    message: {
      required: true,
      type: String
    },
    status: {
      type: String,
      default: 'sent' // "sent", "delivered", "read"
    },
    messageType: {
      type: String,
      enum: [MessageTypes.TEXT, MessageTypes.IMAGE],
      default: MessageTypes.TEXT
    },
    isRead: {
      type: Boolean,
      default: false
    },
    sent: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
