const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },

  expAssigned: {
    type: [String],
  },
});

const teacher = mongoose.model("student", teacherSchema);
module.exports = teacher;
