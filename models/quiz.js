const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    StudyUnit:{
        type: Schema.Types.ObjectId,
        ref: "StudyUnit",
        required: true
    },
    topic:{
        type: Schema.Types.ObjectId
    },
    score:{
        type: Number,
        min: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    takenAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Quiz", quizSchema);