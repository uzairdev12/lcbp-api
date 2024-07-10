const chatModel = require("../Models/chatmodel");
module.exports.createChat = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const newChat = await chatModel.create({
      messages: [
        {
          user: false,
          text: "Hello, Please explain to us your issue in detail, and we will make sure to reply to you as soon as possible !",
        },
      ],
    });
    res.status(200).json({ success: true, newChat });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.addMessage = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { message, chatid, admin } = req.body;
    const chat = await chatModel.findById(chatid);
    if (admin) {
      chat.messages.push({ user: false, text: message });
    } else {
      chat.messages.push({ user: true, text: message });
    }
    chat.lastChanged = new Date();
    const newMessage = chat.save();
    res.status(200).json({ success: true, newMessage });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.getChat = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    const chat = await chatModel.findById(id);
    if (!chat) {
      throw new Error("Chat not found");
    }
    res.status(200).json({ success: true, chat });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.getChats = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const chats = await chatModel.find().sort({ lastChanged: -1 });

    res.status(200).json({ success: true, chats });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.deleteChat = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    const chat = await chatModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, chat });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
