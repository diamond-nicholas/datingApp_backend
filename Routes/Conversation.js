const express = require('express');
const router = express.Router();

const { createNewConv } = require('../controllers/Conversation');

router.route('/create').post(createNewConv);

module.exports = router;
