const { urlencoded } = require('express');
const mongoose = require('mongoose');

const datingCards = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('dating', datingCards);
