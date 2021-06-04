const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({

    key: {
        type: String
    },
    result: {
        type: Array,
        default: []
    },
    mark: {
        type: String,
        default: "Marks will be available after submission"
    },
    submitted: {
        type: Boolean,
        default: false
    },
    done_by: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

const result = mongoose.model("result", resultSchema);
module.exports = result;
