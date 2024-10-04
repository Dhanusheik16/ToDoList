const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  token: {
    type: String,
    require: false,
  },
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

let model = mongoose.model("Users", schema);
module.exports = model;
