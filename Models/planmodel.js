const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
  price: {
    type: "number",
    required: [true, "Price is required."],
  },
  firstChain: {
    type: "number",
    required: [true, "First chain is required."],
  },
  secondChain: {
    type: "number",
    required: [true, "Second chain is required."],
  },
  thirdChain: {
    type: "number",
    required: [true, "Third chain is required."],
  },
  fourthChain: {
    type: "number",
    required: [true, "Fourth chain is required."],
  },
  fifthChain: {
    type: "number",
    required: [true, "Fifth chain is required."],
  },
  boxlimit: {
    type: "number",
    required: [true, "Box limit is required."],
  },
  boxprice: {
    type: "number",
    required: [true, "Box price 1 is required."],
  },
  boxcooltime: {
    type: "number",
    required: [true, "Box cool time is required."],
  },
  amountpkr: {
    type: "number",
    required: [true, "Amount in PKR is required."],
  },
});

module.exports = mongoose.model("plans", planSchema);
