const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  messages: {
    type: "array",
    default: [],
  },
  lastChanged: {
    type: "string",
    default: new Date(),
  },
});

module.exports = mongoose.model("chats", chatSchema);
