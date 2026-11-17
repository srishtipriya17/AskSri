

import express from "express";
import "dotenv/config";
import cors from "cors";


const app = express();
const PORT = 8080;


app.use(express.json());// these are middlewares that allow us to parse incoming JSON requests and handle CORS (Cross-Origin Resource Sharing) issues. when we call frontend from a different domain, the browser will block the request due to security reasons. CORS middleware allows us to specify which domains are allowed to access our backend API.
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test API
app.post("/test", async (req, res) => {
  try {

    console.log("Received message:", req.body.message);
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
              content: req.body.message,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Groq received response:", data);

    res.json({
      success: true,
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});