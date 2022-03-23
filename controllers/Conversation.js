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
    // console.log(error);
  }
};

//get conversation of a user

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createNewConv, getConversation };
