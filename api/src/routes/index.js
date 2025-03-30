const express = require('express');
const messageRoutes = require('./messageRoutes');
const chatRoomRoutes = require('./chatRoomRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/message', messageRoutes);
router.use('/chat-room', chatRoomRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
