const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  type: {
    type: String,
  },
  result: {
    type: Object,
  },
  mark: {
    type: String,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const experiment = mongoose.model("student", expSchema);
module.exports = experiment;
