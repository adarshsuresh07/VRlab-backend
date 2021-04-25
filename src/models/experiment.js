const mongoose = require("mongoose");

const expSchema = new mongoose.Schema({
  key: {
    type: String
},
created_by:{
    type: String
},
type: {
    type: String,
},
created_at: {
    type: Date,
    default: Date.now
},
});

const experiment = mongoose.model("experiment", expSchema);
module.exports = experiment;
