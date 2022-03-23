const Message = require('../models/Message');

//addmessage

const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
};

//getmessage

module.exports = { addMessage };
