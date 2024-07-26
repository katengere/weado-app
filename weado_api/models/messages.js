const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  createdOn: { type: Date, default: new Date() },
});

mongoose.model('Message', MessageSchema);
