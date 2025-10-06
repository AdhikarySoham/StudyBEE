const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
     type: Schema.Types.ObjectId, 
     ref: "User", 
     required: true 
    },

    StudyUnit:{
        type: Schema.Types.ObjectId,
        ref: "StudyUnit",
        required: true
    },

    topic:{
        type: Schema.Types.ObjectId
    },

    EF: { // Easiness Factor
     type: Number,
     default: 2.5 
    }, 
   interval: {  // in days
     type: Number, 
     default: 1 
    },

  repetitions: { 
     type: Number,
     default: 0 
    },

  nextReviewDate: { 
     type: Date, 
     default: Date.now 
   }
});

module.exports = mongoose.model("Review", reviewSchema);
