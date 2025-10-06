const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const resourceSchema=new Schema({
    type:String, // pdf, image, txt file 
    url:String
});

const topicSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String  // We generate quiz from this note
    },
    videos:[String],
    resources:[resourceSchema]
});

const studyUnitSchema=new Schema({
    sub_name:{
        type:String,
        required:true
    },
    description:String,
    topics:[topicSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const StudyUnit=mongoose.model("StudyUnit",studyUnitSchema);
module.exports=StudyUnit;