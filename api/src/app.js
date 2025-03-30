require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const appRoutes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const Message = require('./models/Message');
const { convertToObjectId } = require('./helpers/mongodb');
const { MessageTypes } = require('./constants/messageConstants');
const User = require('./models/User');

const mongoString = process.env.DATABASE_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

mongoose
  .connect(mongoString)
  .then(() => console.log('Connected to Database!'))
  .catch(() => console.log('Unable to connect to Database!'));

app.use(cors());
app.use(express.json());
app.use('/api', appRoutes);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!c  vdxcwe');
});

let users = [];

const removeUser = (userToRemove) => {
  users = users.filter((user) => user !== userToRemove);
  console.log('users after one removed', users);
};

const joinUser = (newUser) => {
  const foundUser = users.find((user) => user === newUser);
  if (!foundUser) {
    users.push(newUser);
  }
  console.log('users after one joined', users);
};

io.on('connection', (socket) => {
  socket.on('user-joined', (newUser) => {
    joinUser(newUser);
  });

  socket.on('private-message', async (data, callback) => {
    const { recipientId, senderId, message } = data;

    const messageData = {
      senderId: convertToObjectId(senderId),
      recieverId: convertToObjectId(recipientId),
      message,
      messageType: MessageTypes.TEXT,
      sent: new Date()
    };

    // find recipient
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json('Recipient not found!');
    }

    // create new message
    const createdMessage = new Message(messageData);
    await createdMessage.save();

    // send the message to recipient
    io.to(recipient?.socketId).emit('private-message', createdMessage?._doc);

    // send the response data
    callback({
      ...createdMessage?._doc
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
    removeUser(socket.id);
  });
});

server.listen(8000, () => {
  console.log('Server running on port 8000');
});
