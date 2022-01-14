const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

    Id: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
    },
    Age: { type: Number },
    Mark1: { type: Number },
    Mark2: { type: Number },
    Mark3: { type: Number },



})

const studentdata = new mongoose.model("studentModels", studentSchema)

module.exports = studentdata

