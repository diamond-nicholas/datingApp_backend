const Message = require('../models/Message');

//addmessage

const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//getmessage

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { addMessage, getMessages, getAllMessages };
