const express = require('express');
const Message = require('../models/Message');
const { convertToObjectId } = require('../helpers/mongodb');

const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET CONVERSATION
router.get('/private-conversation', async (req, res) => {
  try {
    const { senderId, recieverId } = req.query;

    if (!senderId || !recieverId) {
      return res.status(403).json('Missing required parameters!');
    }

    const messages = await Message.find({
      $or: [
        {
          senderId: convertToObjectId(senderId),
          recieverId: convertToObjectId(recieverId)
        },
        {
          senderId: convertToObjectId(recieverId),
          recieverId: convertToObjectId(senderId)
        }
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json('Message deleted!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
