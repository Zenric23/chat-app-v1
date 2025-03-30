const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./src/models/User');
const localUsers = require('./usersData.json');

// Load environment variables from .env file
dotenv.config();

const mongoUri = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const promises = localUsers.map(async (user) => {
  const newUser = new User({
    email: user.email,
    name: user.name,
    profile_pic: user.profile_pic
  });
  await newUser.save();
});

Promise.all(promises);

console.log('Users seeded successfully!');
