import OpenAI from "openai";
import 'dotenv/config';



const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateQuiz(topic) {
  try {
    const prompt = `
    Generate exactly 5 multiple choice questions on the topic "${topic}".
    Return the output strictly in JSON format with the following structure:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "answer": "Correct answer from the options in string"
        },
        ...
      ]
    }
    Ensure that the questions are diverse and cover different aspects of the topic.
    `;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
      //temperature: 0.7
    });

    const quizText = response.output_text.trim();
    console.log("Quiz Text:", quizText);

    // Parse JSON
    const quizData = JSON.parse(quizText);

    return quizData;
  } catch (error) {
    console.error("Quiz generation error:", error);
    return null;
  }
}
