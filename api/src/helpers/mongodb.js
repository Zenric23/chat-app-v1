const mongoose = require('mongoose');

const convertToObjectId = (idString) => {
  return new mongoose.Types.ObjectId(idString);
};

module.exports = { convertToObjectId };
