const Conversation = require('../models/Conversation');

//create new conversation

const createNewConv = async (req, res) => {
  const newConversaton = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversaton.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get conversation of a user

module.exports = { createNewConv };
