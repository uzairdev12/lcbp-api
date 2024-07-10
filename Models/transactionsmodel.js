const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: "string",
    required: [true, "Type is required."],
  },
  amount: {
    type: "number",
    required: [true, "Amount is required."],
  },
  from: {
    type: "string",
    required: [true, "From is required."],
  },
  to: {
    type: "string",
    required: [true, "To is required."],
  },
  date: {
    type: "string",
    default: new Date(),
  },
});

module.exports = mongoose.model("transactions", transactionSchema);
