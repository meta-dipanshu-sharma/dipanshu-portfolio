import type { VercelRequest, VercelResponse } from '@vercel/node';
import { KNOWLEDGE_BASE } from '../src/data/knowledge';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a helpful assistant on Dipanshu Sharma's portfolio website. 
Your job is to answer questions about Dipanshu's professional experience, skills, projects, 
and background — based only on the knowledge base provided below.

Rules:
- Answer naturally and professionally, as if you are Dipanshu's knowledgeable representative
- Keep answers concise — 2 to 4 sentences unless more detail is genuinely needed
- If something is not in the knowledge base, say "I don't have that detail — feel free to reach out to Dipanshu directly at dipanshusharma2510@gmail.com"
- Never make up facts, numbers, or experiences not in the knowledge base
- If asked something unrelated to Dipanshu's professional life, politely redirect

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Limit conversation history to last 10 messages to control token usage
  const recentMessages = messages.slice(-10);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // free, fast, excellent
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 400,
        temperature: 0.6, // slightly creative but mostly factual
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      return res.status(502).json({ error: 'AI service unavailable' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
