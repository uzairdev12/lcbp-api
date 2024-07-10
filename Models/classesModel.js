const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: "string",
    default: "",
  },
  link: {
    type: "string",
    default: "",
  },
  live: {
    type: "boolean",
    default: false,
  },
});

module.exports = mongoose.model("classes", classSchema);
