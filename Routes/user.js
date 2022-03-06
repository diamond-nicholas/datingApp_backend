const express = require('express');
const router = express.Router();

const { createNewUser } = require('../controllers/user');

router.route('/create').post(createNewUser);

module.exports = router;
