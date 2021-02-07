const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Select", "Male", "Female", "Other"],
  },
  education: {
    type: String,
    required: true,
  },
  checkBox: {
    type: Boolean,
    required: true,
  },
});

module.exports = Info = mongoose.model("info", InfoSchema);
