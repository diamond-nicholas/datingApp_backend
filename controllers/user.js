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
      return res
        .status(402)
        .json({ status: false, message: 'User fields cannot be empty' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });
    const user = await Users.create({ ...req.body });
    return res.status(201).json({
      status: true,
      message: 'User succesfully created',
      token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res

        .status(400)
        .json({ message: 'Please provide email and password' });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '180s',
    });
    return res
      .status(200)
      .json({ status: true, message: 'success', token, user });
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

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: `No user with id ${id}` });
    }
    return res.status(200).json({
      message: 'Succefully fectched user',
      user,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = {
      new: true,
    };
    const user = await Users.findByIdAndUpdate(id, update, options);
    return res.status(201).json({
      message: 'Profile successfully updated',
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: `No user with id ${id}` });
    }
    return res.status(200).json({
      message: `User ${user.name} is succesfully deleted`,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteAllUser = async (req, res) => {
  try {
    await Users.deleteMany({});
    return res.status(201).json({ msg: 'All users has been deleted' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getOneUser,
  updateUserProfile,
  deleteOneUser,
  deleteAllUser,
  signInUser,
};
