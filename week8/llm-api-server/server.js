import express from "express";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const getAIProvider = () => {
  const provider = process.env.AI_PROVIDER;

  if (provider === "openai") {
    return new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
    });
  } else if (provider === "anthropic") {
    return new ChatAnthropic({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.ANTHROPIC_MODEL || "claude-3-haiku-20240307",
      temperature: 0.7,
    });
  } else {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

const template = `Generate a recipe for a dish using {ingredient}. 
Respond with a JSON object following this exact structure:
{{
  "name": "Delicious Dish Name",
  "ingredients": [
    "1 cup of ingredient1",
    "2 tablespoons of ingredient2",
    "3 pieces of ingredient3"
  ],
  "instructions": [
    "Step 1: Do this first.",
    "Step 2: Then do this.",
    "Step 3: Finally, do this."
  ]
}}
Only return json and no other text.`;

const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["ingredient"],
});

const llm = getAIProvider();
app.all("/api/generate-recipe", async (req, res) => {
  console.time("generate-recipe");
  try {
    let ingredient;
    if (req.method === "GET") {
      ingredient = req.query.ingredient;
    } else if (req.method === "POST") {
      ingredient = req.body.ingredient;
    }

    if (!ingredient) {
      return res.status(400).json({ error: "Ingredient is required" });
    }

    const formattedPrompt = await prompt.format({ ingredient });
    const response = await llm.invoke(formattedPrompt);
    const recipe = JSON.parse(response.content);
    res.json(recipe);
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
  console.timeEnd("generate-recipe");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
