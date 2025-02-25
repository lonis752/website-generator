import OpenAI from "openai";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const API_KEY = process.env.API_KEY;
const port = process.env.PORT;

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

app.get("/code", async (req, res) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "developer",
        content:
          "You are a highly experienced programer. you will only respond in code and nothing else so that the recipient of your answer will be able to copy and paste exactly what you said into their code and have it work immediately.",
      },
      {
        role: "user",
        content:
          "Write a new and unique code with only the HTML code but only the body using tailwindcss for styling that is a fully functional homepage for a blog with things like tabs for different categories, animated transitions. it must have a header/navbar and a random photos from the web that is royalty free and a footer. only reply with html code and nothing else. use className instead of class and don't add comments.",
      },
    ],
    store: true,
  });
  console.log(completion.choices[0].message);
  res.send(completion.choices[0].message);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
