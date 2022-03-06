const express = require('express');
const router = express.Router();

const {
  getAllDatingCards,
  createDatingCards,
} = require('../controllers/datingCards');

router.route('/get').get(getAllDatingCards);
router.route('/create').post(createDatingCards);

module.exports = router;
