const express = require('express');
const ChatRoom = require('../models/ChatRoom');

const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const newChatRoom = new ChatRoom(req.body);
    await ChatRoom.save();
    res.status(200).json(newChatRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedChatRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await ChatRoom.findByIdAndDelete(req.params.id);
    res.status(200).json('ChatRoom deleted!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
