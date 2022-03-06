const express = require('express');
const router = express.Router();

const { getAllDatingCards } = require('../controllers/datingCards');

router.route('/').get(getAllDatingCards);

module.exports = router;
