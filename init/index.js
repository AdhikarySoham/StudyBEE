const mongoose=require("mongoose");
const initData=require("./data.js");
const StudyUnit=require("../models/studyunit.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/studyapp");
}

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

const initDB=async ()=>{
    await StudyUnit.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"6893636c332170c92e4bf830"
    }));
    await StudyUnit.insertMany(initData.data);
    console.log("Database initialized with sample data.");
};

initDB();
