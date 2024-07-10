const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  userid: {
    type: "string",
    required: [true, "User id is required."],
  },
  username: {
    type: "string",
    required: [true, "User name is required."],
  },
  userbalance: {
    type: "number",
    required: [true, "User balance is required."],
  },
  amount: {
    type: "number",
    required: [true, "Amount is required."],
  },
  status: {
    type: "string",
    default: "pending",
  },
  accountnum: {
    type: "string",
    required: [true, "Account number is required."],
  },
  accountName: {
    type: "string",
    required: [true, "Account name is required."],
  },
  AccountPlatform: {
    type: "string",
    required: [true, "Account platform is required."],
  },
  date: {
    type: "string",
    default: new Date(),
  },
});

module.exports = mongoose.model("withdraws", withdrawSchema);
