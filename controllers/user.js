const Users = require('../models/user');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

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

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    if (users.length < 1) {
      return res.status(400).json({ message: 'There are no users' });
    }
    const nbHits = users.length;
    return res.status(201).json({
      message: 'user successfully fetched',
      nbHits,
      users: users,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'Failed to fetch users',
    });
  }
};

const AddProfileImage = async (req, res) => {
  try {
    const profile_image = req.file.originalname;

    const img = await Users.findOneAndUpdate(profile_image);
    console.log(img);
    return res.status(201).json({
      message: 'profile image updated',
      data: img,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  AddProfileImage,
};
