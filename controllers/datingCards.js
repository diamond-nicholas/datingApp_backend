const datingCards = require('../models/datingCards');

const getAllDatingCards = async (req, res) => {
  const dating = await datingCards.find({});
  // throw new Error('testing async errors');
  res.status(200).json({ dating, nbHits: products.length });
};

module.exports = {
  getAllDatingCards,
};
