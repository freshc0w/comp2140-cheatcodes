
import express from 'express';
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const getAIProvider = () => {
  const provider = process.env.AI_PROVIDER;

  if (provider === 'openai') {
    return new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.7,
    });
  } else if (provider === 'anthropic') {
    return new ChatAnthropic({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307',
      temperature: 0.7,
    });
  } else {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

const llm = getAIProvider();

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid message history is required' });
    }

    const response = await llm.invoke(messages);
    res.json({ reply: response.content });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
