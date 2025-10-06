const express = require('express');
const router=express.Router();
const StudyUnit=require("../models/studyunit.js");
const { isLoggedIn } = require('../middleware.js');

// Index route - Show all study units, home page
router.get("/", async (req,res)=>{
    const studyunits=await StudyUnit.find({}).populate("owner");
    res.render("studyunits/index.ejs",{studyunits});
});

// Create route - Create a new study unit   [get+post]
// Get
router.get("/new_studyunit",isLoggedIn, (req,res)=>{
   // console.log(req.user);
   res.render("studyunits/new_studyunit.ejs");
});

// Post
router.post("/",isLoggedIn,async (req,res)=>{
    let {sub_name, description}=req.body;
    let newStudyUnit=new StudyUnit({
        sub_name:sub_name,
        description:description,
        topics:[]
    });
    newStudyUnit.owner=req.user._id; // Set the owner to the current user
    await newStudyUnit.save();
    res.redirect("/studyunits");
})

// Show route- Show specific study unit
router.get("/:id", async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id).populate("owner");
    console.log(studyunit)
    res.render("studyunits/all_topics.ejs",{studyunit});
});

// Show route- Show specific topic in a study unit
router.get("/:id/topics/:topicId", async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);
    const topic=studyunit.topics.id(req.params.topicId);
    res.render("studyunits/topic.ejs",{studyunit,topic});
});

// Create route - Create a new topic in a study unit   [get+post]
// Get 
router.get("/:id/new_topic",isLoggedIn, async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);
    res.render("studyunits/new_topic.ejs",{studyunit});
});

// Post
router.post("/:id",isLoggedIn,async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);
    const newTopic={
        title:req.body.title,
        notes:req.body.notes,
        videos:req.body.videos ? req.body.videos.split(",") : [],
        resources:req.body.resources ? req.body.resources.split(",").map(url => ({ type: "pdf", url })) : []
    };
    studyunit.topics.push(newTopic);
    await studyunit.save();
    res.redirect(`/studyunits/${studyunit._id}`);
}); 

// Edit and Update Notes
// Edit route - Get req from the form to edit a topic
router.get("/:id/topics/:topicId/edit",isLoggedIn, async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);
    const topic=studyunit.topics.id(req.params.topicId);
    res.render("studyunits/edit_topic.ejs",{studyunit,topic});
});

router.put("/:id/topics/:topicId",isLoggedIn, async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);

    const topic=studyunit.topics.id(req.params.topicId);
    
    // Update the topic with new data
    studyunit.updatedAt = new Date(); // Update the study unit's updatedAt field
    topic.notes=req.body.notes;
    await studyunit.save();
    res.redirect(`/studyunits/${studyunit._id}/topics/${topic._id}`);
});

// Destroy route - Delete a topic from a study unit
router.delete("/:id/topics/:topicId",isLoggedIn, async (req,res)=>{
    const studyunit=await StudyUnit.findById(req.params.id);
    studyunit.topics=studyunit.topics.filter((p)=>p.id!=req.params.topicId);
    await studyunit.save();
    res.redirect(`/studyunits/${studyunit._id}`);
});

// Destroy route - Delete a study unit
router.delete("/:id",isLoggedIn, async (req,res)=>{
    await StudyUnit.findByIdAndDelete(req.params.id);
    res.redirect("/studyunits");
});


module.exports=router;