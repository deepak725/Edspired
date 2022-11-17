const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_picture: {
    type: Buffer
  },
  dob: {
    type: Date
  },
  bio: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
 }, {
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);