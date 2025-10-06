// Map quiz percentage to SM-2 grade
function percentageToGrade(score) {
  if (score >= 90) return 5;
  if (score == 80) return 4;
  if (score == 60) return 3;
  if (score == 40) return 2;
  if (score == 20) return 1;
  return 0;
}

// Calculate next review date using SM-2 spaced repetition logic
function calculateNextReview(review, quizScore) {
  const grade = percentageToGrade(quizScore);

  let { EF, interval, repetitions } = review;

  if (grade >= 3) {
    if (repetitions === 0) {
      interval = 1; // First review after 1 day
    } else if (repetitions === 1) {
      interval = 6; // Second review after 6 days
    } else {
      const gradefactor=1+(grade-3)*0.15; // Adjust factor based on grade
      interval = Math.round(interval * EF * gradefactor ); // Multiply interval by EF
    }

    // Update EF based on performance
    EF = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

    if (EF < 1.3){
      EF = 1.3;
    } 
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1; // Reset to 1 day if failed
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    EF,
    interval,
    repetitions,
    nextReviewDate
  };
}

module.exports = { calculateNextReview };
