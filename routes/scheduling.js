const express = require("express");
const router = express.Router();
const StudyUnit=require("../models/studyunit.js");
const Review = require("../models/review");
const { calculateNextReview } = require("../utils/spacedRepetition");

// POST endpoint to update review after quiz
router.post("/:id/topics/:topicId/review", async (req, res) => {
    const { studyunitID, topicId, quizScore } = req.body;
    const userId = req.user._id;
    console.log(req.body);
    console.log(userId);

    let review = await Review.findOne({ userId, StudyUnit:studyunitID, topic:topicId });

    if (!review) {
      review = new Review({ userId, StudyUnit:studyunitID, topic: topicId});
    }

    const { EF, interval, repetitions, nextReviewDate } = calculateNextReview(review, quizScore);

    review.EF = EF;
    review.interval = interval;
    review.repetitions = repetitions;
    review.nextReviewDate = nextReviewDate;
    
    await review.save();
    req.flash("success", "Review updated successfully!");
    res.redirect(`/studyunits/${studyunitID}/topics/${topicId}`);
    
  
});

module.exports = router;        
