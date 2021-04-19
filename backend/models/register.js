const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Register", registerSchema);
