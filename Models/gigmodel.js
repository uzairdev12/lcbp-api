const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: [true, "Title is required."],
  },
  description: {
    type: "string",
    required: [true, "Description is required."],
  },
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
  about: {
    type: "string",
    required: [true, "About is required."],
  },
  from: {
    type: "string",
    required: [true, "From is required."],
  },
  time: {
    type: "string",
    required: [true, "Time is required."],
  },
  gender: {
    type: "string",
    required: [true, "Gender is required."],
  },
  age: {
    type: "string",
    required: [true, "Age is required."],
  },
  byname: {
    type: "string",
    required: [true, "Byname is required."],
  },

  byimage: {
    type: "string",
    default:
      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
  },
  byid: {
    type: "string",
    required: [true, "UserID is required"],
  },
  experience: {
    type: "string",
    required: [true, "Experience is required."],
  },
  field: {
    type: "string",
    required: [true, "Field is required."],
  },
  email: {
    type: "string",
    required: [true, "Email is required."],
  },
  number: {
    type: "number",
    required: [true, "Number is required."],
  },
  price: {
    type: "number",
    required: [true, "Price is required."],
  },
  imageurl: {
    type: "string",
    default: null,
  },
});

module.exports = mongoose.model("gigs", gigSchema);
