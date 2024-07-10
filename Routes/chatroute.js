const express = require("express");
const {
  createChat,
  getChats,
  addMessage,
  deleteChat,
  getChat,
} = require("../Controllers/chatcontrollers");

const router = express.Router();

router.get("/initiate", createChat);
router.get("/get", getChats);
router.post("/send", addMessage);
router.post("/getchat", getChat);
router.post("/delete", deleteChat);

module.exports = router;
