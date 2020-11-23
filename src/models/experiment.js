const mongoose = require("mongoose");

const expSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    doneBy: {
      type: [String],
    },
    result: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const experiment = mongoose.model("student", expSchema);
module.exports = experiment;
