const datingCards = require('../models/datingCards');

const getAllDatingCards = async (req, res) => {
  try {
    const dating = await datingCards.find({});
    // throw new Error('testing async errors');
    res.status(200).json({ dating, nbHits: products.length });
  } catch (error) {
    res.status(404).json({ msg: 'there is no data, check back' });
  }
};

module.exports = {
  getAllDatingCards,
};
