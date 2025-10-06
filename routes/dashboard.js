const express=require("express");
const router=express.Router();
const StudyUnit=require("../models/studyunit.js");
const Review = require("../models/review.js");
const Quiz = require("../models/quiz.js");
const { isLoggedInDash } = require('../middleware.js');


router.get("/",isLoggedInDash,async (req,res)=>{
   // res.send("Dashboard Home");
     try {
    // Recent quiz scores

    const quizzes = await Quiz.find({ user: req.user._id })
      .populate("StudyUnit")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    // console.log(quizzes);

    const quizWithTopics= await Promise.all(quizzes.map(async(quiz) =>{
          const studyunit= await StudyUnit.findById(quiz.StudyUnit._id);
          const topic=studyunit.topics.id(quiz.topic);
          return{
            ...quiz,
            topicName: topic ? topic.title : "No Topic",
            studyUnitName: studyunit ? studyunit.sub_name : "No Study Unit"
          };

        })
    );

    
    // Scheduled reviews
    const reviews = await Review.find({ userId: req.user._id })
      .populate("StudyUnit")
      .sort({ nextReviewDate: 1 })
      .lean();

    // console.log(reviews);

     const reviewWithTopics= await Promise.all(reviews.map(async(review) =>{
          const studyunit= await StudyUnit.findById(review.StudyUnit._id);
          const topic=studyunit.topics.id(review.topic);
          return{
            ...review,
            topicName: topic ? topic.title : "No Topic",
            studyUnitName: studyunit ? studyunit.sub_name : "No Study Unit"
          };

        })
     );

     console.log(reviewWithTopics);

    res.render("dashboard/dashboard.ejs", { quizWithTopics, reviewWithTopics });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
});

module.exports=router;