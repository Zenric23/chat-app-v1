const express = require('express');
const User = require('../models/User');
const Message = require('../models/Message');

const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  try {
    const { excludedUserId, searchText } = req.query;

    let users = [];
    const queryObject = { _id: { $ne: excludedUserId } };

    if (searchText) {
      queryObject['$or'] = [{ name: { $regex: searchText, $options: 'i' } }];
    }

    if (excludedUserId) {
      users = await User.find(queryObject);
    } else {
      users = await User.find();
    }

    const usersWithAdditionDetails = [];

    for (const user of users) {
      const lastMessage = await Message.findOne({
        $or: [
          { senderId: excludedUserId, recieverId: user?._id },
          { senderId: user?._id, recieverId: excludedUserId }
        ]
      }).sort({ createdAt: -1 }); // No need for .limit(1) with findOne()

      usersWithAdditionDetails.push({ ...user.toObject(), lastMessage });
    }

    res.status(200).json(usersWithAdditionDetails.sort((a) => (a.lastMessage !== null && a.lastMessage !== undefined ? -1 : 1)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User deleted!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
