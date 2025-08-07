import { Configuration, OpenAIApi } from "openai";  // ✅ use 'import'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const userMessage = req.body.queryResult?.queryText || "Hello";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who replies in friendly, bilingual (Telugu+English) style. Keep responses short and polite.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.data.choices[0].message.content;

    res.status(200).json({ fulfillmentText: reply });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(200).json({
      fulfillmentText:
        "Oops! Naku konchem samasya vacchindi. Try cheyyandi inko sari 🙏",
    });
  }
}
