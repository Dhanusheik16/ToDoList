const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  Date: {
    type: Date,
    default: new Date(),
  },
});

let model = mongoose.model("Todolist", schema);
module.exports = model;
