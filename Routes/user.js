const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../auth/auth');
const cloudinary = require('../utilis/cloud');
// const upload = require('../utilis/multer.js');
const upload = require('../utilis/helpers');

const User = require('../models/user');
const AddProfileImage = require('../controllers/user');

const { createNewUser, getAllUsers } = require('../controllers/user');

router.route('/create').post(createNewUser);
router.route('/get', authenticateToken).get(getAllUsers);

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

// router.patch('/upload/:id', upload.single('image'), AddProfileImage

// async (req, res) => {
//   AddProfileImage;
//   // try {
//   //   // Upload image to cloudinary
//   //   const result = await cloudinary.uploader.upload(req.file.path);
//   //   // console.log(req.user.username);
//   //   // Create new user
//   //   let user = new User({
//   //     name: req.user.name,
//   //     avatar: result.secure_url,
//   //     cloudinary_id: result.public_id,
//   //   });
//   //   // Save user
//   //   await user.save();
//   //   return res.json(user);
//   // } catch (err) {
//   //   console.log(err.message);
//   // }
// });

module.exports = router;
