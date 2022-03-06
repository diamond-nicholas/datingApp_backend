const datingCards = require('../models/datingCards');

const createDatingCards = async (req, res) => {
  try {
    const dating = req.body;
    datingCards.create(dating);
    const date = await datingCards.create(dating);
    return res.status(201).json({ msg: 'succesfully created', date });
  } catch (error) {
    return res.status(404).json(error);
  }
};

const getAllDatingCards = async (req, res) => {
  try {
    const dating = await datingCards.find({});
    res.status(200).json({ dating, nbHits: dating.length });
  } catch (error) {
    res.status(404).json({ msg: 'there is no data, check back' });
  }
};

module.exports = {
  getAllDatingCards,
  createDatingCards,
};
