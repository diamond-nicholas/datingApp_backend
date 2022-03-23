const express = require('express');
const router = express.Router();

const {
  createNewConv,
  getConversation,
} = require('../controllers/Conversation');

router.route('/create').post(createNewConv);
router.route('/:id').get(getConversation);

module.exports = router;
