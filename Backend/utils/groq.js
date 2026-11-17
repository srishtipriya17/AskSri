
import "dotenv/config";

const getGroqResponse = async (message) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq API request failed");
    }

    return data.choices[0].message.content; //reply from Groq API

  } catch (error) {
    console.log("Groq API Error:", error);
    throw error;
  }
};

export default getGroqResponse;
