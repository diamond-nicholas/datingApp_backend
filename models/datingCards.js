const mongoose = require('mongoose');

const datingCards = new mongoose.Schema({
  name: String,
  imgUrl: String,
});

module.exports = mongoose.model('dating', datingCards);
