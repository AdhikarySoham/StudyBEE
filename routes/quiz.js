const express = require('express');
const router = express.Router();
const Quiz = require("../models/quiz.js");
const StudyUnit=require("../models/studyunit.js");
const { model } = require('mongoose');
const { generateQuiz } = require("../utils/quizGenerator.js");

router.get("/:id/topics/:topicId/quiz", async (req, res,next) => {
    try{
        const studyunit = await StudyUnit.findById(req.params.id);
        if(!studyunit){
          throw new Error("Study unit not found");
        }
        const topic=studyunit.topics.id(req.params.topicId);
        if(!topic){
          throw new Error("Topic not found");
        }
        const quizData = await generateQuiz(topic.title);
        if(!quizData){
          throw new Error("Quiz generation failed");
        }
        
        res.render("quiz_layout/quiz.ejs", { studyunit, topic, quizData });
    } catch(err){
        next(err);
    }
});

// routes/quiz.js (add this below the generate route)

router.post("/:id/topics/:topicId/submit", async (req, res) => {
    let score = 0;
    let total = 0;
    
    for (let key in req.body) {
        if (key.startsWith('answer_')) {
            total++;
        }
    }

    for (let i = 0; i < total; i++) {
        const correctAnswer = req.body[`answer${i}`];
        const userAnswer = req.body[`answer_${i}`];

        console.log(`Q${i + 1}: Correct → ${correctAnswer} | User → ${userAnswer}`);

        if (correctAnswer === userAnswer) {
            score++;
        }
    }
    console.log(req.params.id);
    let quizResult = await Quiz.findOne({ StudyUnit: req.params.id, topic: req.params.topicId, user: req.user._id });
    if (!quizResult) {
        quizResult = new Quiz({StudyUnit: req.params.id, topic: req.params.topicId, user: req.user._id});
    }
    
    quizResult.score = score;
    quizResult.takenAt = new Date();   
    await quizResult.save();

    const studyunit=await StudyUnit.findById(req.params.id);
    const topic=studyunit.topics.id(req.params.topicId);

    console.log(`Final Score: ${score}/${total}`);

    // res.send(`Your score is ${score} out of ${total}`);
    res.render("quiz_layout/quiz_result.ejs", { score, total, studyunit, topic });

});

router.get("/:id/topics/:topicId", async (req, res) => {
     const studyunit=await StudyUnit.findById(req.params.id);
     const topic=studyunit.topics.id(req.params.topicId);

    res.redirect(`/studyunits/${studyunit._id}/topics/${topic._id}`);
});

   

module.exports = router;