const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  usersname: {
    type: "string",
    required: [true, "Name is required."],
  },
  usersid: {
    type: "string",
    required: [true, "Id is required."],
  },
  usersimageurl: {
    type: "string",
    required: false,
    default:
      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
  },
  proof: {
    type: "string",
    required: [true, "Proof is required."],
  },
  usersid: {
    type: "string",
    required: [true, "Id is required."],
  },
  planid: {
    type: "string",
    required: [true, "Id is required."],
  },
  method: {
    type: "string",
    required: [true, "Method is required."],
  },
  accountnum: {
    type: "string",
    required: [true, "Account number is required."],
  },
  planname: {
    type: "string",
    required: [true, "Plan name is required."],
  },
  planprice: {
    type: "number",
    required: [true, "Plan price is required."],
  },
  pending: {
    type: "boolean",
    required: [true, "Pending is required."],
  },
  profit: {
    type: "number",
    required: false,
    default: 0,
  },
  paid: {
    type: "number",
    required: false,
    default: 0,
  },
  transactionid: {
    type: "string",
    required: [true, "Transaction id is required."],
  },
  accepted: {
    type: "boolean",
    default: false,
  },
  date: {
    type: "string",
    required: false,
    default: new Date(),
  },
});

module.exports = mongoose.model("requests", requestSchema);
