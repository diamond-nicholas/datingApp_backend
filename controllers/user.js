const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!req.body) {
      return res.status(402).json({ message: 'No request body' });
    }
    if (!name || !email || !password) {
      return res.status(402).json({ message: 'User fields cannot be empty' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });
    const user = await Users.create({ ...req.body });
    return res.status(201).json({
      message: 'User succesfully created',
      token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createNewUser,
};
