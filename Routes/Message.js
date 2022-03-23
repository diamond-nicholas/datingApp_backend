const express = require('express');
const router = express.Router();

const { addMessage } = require('../controllers/Message');

router.route('/create').post(addMessage);

module.exports = router;
