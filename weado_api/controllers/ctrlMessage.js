const mongoose = require("mongoose");
const Message = mongoose.model('Message');

const ctrlAddMessage = async (req, res) => {
  const { name, email, text, createdOn } = req.body;
  const newMsg = { name, email, text, createdOn };
  console.log(newMsg);
  const savedMsg = await Message.create(newMsg);
  res.status(201).json(savedMsg);
}

const ctrlGetAllMessage = async (req, res) => {
  const msgs = await Message.find();
  res.status(201).json(msgs);
}

module.exports = {
  ctrlAddMessage,
  ctrlGetAllMessage
}