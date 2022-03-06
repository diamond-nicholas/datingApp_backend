const { urlencoded } = require('express');
const mongoose = require('mongoose');

const datingCards = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: urlencoded,
  },
});

module.exports = mongoose.model('dating', datingCards);
