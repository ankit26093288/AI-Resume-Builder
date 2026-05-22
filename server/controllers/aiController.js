const { GoogleGenerativeAI } =
  require("@google/generative-ai");

console.log("========= AI DEBUG =========");

console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
);

console.log("============================");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateSummary = async (req, res) => {

  try {

    console.log("AI API HIT");

    const {
      skills,
      experience,
    } = req.body;

    console.log("Skills:", skills);

    console.log("Experience:", experience);

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

    console.log("Model Loaded");

    const prompt = `
      Create a professional resume summary
      using these skills:
      ${skills}

      and experience:
      ${experience}

      Keep it professional and short.
    `;

    console.log("Prompt Created");

    const result =
      await model.generateContent(prompt);

    console.log("AI Response Received");

    const response =
      await result.response;

    const text = response.text();

    console.log("Generated Text:", text);

    res.status(200).json({
      summary: text,
    });

  } catch (error) {

    console.log("========= AI ERROR =========");

    console.log(error);

    console.log("============================");

    res.status(500).json({
      message: "AI Generation Failed",
      error: error.message,
    });

  }

};

module.exports = {
  generateSummary,
};