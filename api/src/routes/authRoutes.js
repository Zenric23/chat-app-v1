const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) return res.status(404).json('User does not exist');
    await User.findByIdAndUpdate(userFound?._id, {
      socketId: req.body.socketId
    });
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/google/login', async (req, res) => {
  try {
    const { email, picture, verified_email, given_name, family_name } = req.body;
    let userFound = await User.findOne({ email });

    if (!verified_email) {
      return res.status(403).json('Email is not verified!');
    }

    if (!userFound) {
      userFound = new User({ name: `${given_name} ${family_name}`, email, profile_pic: picture });
      await userFound.save();
    }

    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
