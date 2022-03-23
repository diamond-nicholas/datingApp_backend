const express = require('express');
const router = express.Router();

const {
  addMessage,
  getMessages,
  getAllMessages,
} = require('../controllers/Message');

router.route('/create').post(addMessage);
router.route('/get/:conversationId').get(getMessages);
router.route('/get/').get(getAllMessages);

module.exports = router;
