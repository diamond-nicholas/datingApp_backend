const Users = require('../models/user');

const createNewUser = async (req, res) => {
  try {
    const User = req.body;
    const user = Users.create(User);
    return res.status(201).json({
      msg: 'User succesfully created',
      user,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createNewUser,
};
