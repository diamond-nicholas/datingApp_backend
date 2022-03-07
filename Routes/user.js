const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth/auth');
const upload = require('../utilis/helpers');
const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const cloudinary = require('../utilis/cloud');
// const upload = require('../utilis/multer.js');

const {
  createNewUser,
  getAllUsers,
  getOneUser,
  updateUserProfile,
  deleteOneUser,
} = require('../controllers/user');

router.route('/create').post(createNewUser);
router.route('/get', authenticateToken).get(getAllUsers);
router.route('/get/:id').get(getOneUser);
router.route('/updateprofile/:id').patch(updateUserProfile);
router.route('/deleteone/:id').delete(deleteOneUser);

router.patch(
  '/upload/:id',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const query = req.params.id;
      const update = { image: req.file.url };
      const options = { new: true };
      const user = await User.findByIdAndUpdate(query, update, options);

      return res.status(201).json({
        message: 'profile image updated',
        data: user,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
);

module.exports = router;
