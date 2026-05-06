import type { VercelRequest, VercelResponse } from '@vercel/node';

const KNOWLEDGE_BASE = `
# DIPANSHU SHARMA — PROFESSIONAL KNOWLEDGE BASE

## Personal
- Full name: Dipanshu Sharma
- Location: Berlin, Germany
- Email: dipanshusharma2510@gmail.com
- LinkedIn: https://linkedin.com/in/sharma-dipanshu
- GitHub: https://github.com/meta-dipanshu-sharma
- Phone: +49 151 23382340
- Years of experience: 7+
- Currently open to: Mid/Senior Frontend, Full Stack, and Staff Engineer roles
- Preferred work: Berlin or anywhere in Germany
- Available: Yes, actively looking as of Q2 2026
- Notice period: 1 month notice period

## Current Role
- Company: Kaufland e-commerce, Berlin
- Title: Frontend Developer
- Period: January 2024 – Present
- What I do: Own and maintain a micro-frontend architecture across 4+ repositories powering the Seller Portal Delivery & Return Experience
- Key achievement: Led Vue 2 → Vue 3 migration across 25+ components, reducing bundle size by ~15%
- Built a TypeScript + GraphQL BFF layer orchestrating data across 6+ backend microservices
- Delivered Returnless Refunds, Return Label Reselling, and OOH delivery with location-based filtering
- Impact: 22% adoption increase in first month for OOH feature, lowered seller logistics costs
- Implemented WCAG accessibility standards covering 90%+ of key user flows
- Introduced Jest unit testing reaching ~85% coverage on critical UI modules
- Tech used: Vue 3, TypeScript, GraphQL, Jest, Datadog, GA4, GTM, Optimizely, Lokalise

## Previous Role — Cisco Webex
- Company: Cisco Webex, Bengaluru, India
- Title: Software Developer
- Period: January 2022 – December 2023
- What I did: Engineered core features for the Webex Web JavaScript SDK supporting ~2.5M monthly meeting joins
- Built the Webex Web Calling Client and browser extension in React — 2K+ downloads at launch
- Worked with WebRTC APIs for real-time audio/video communication
- Implemented background noise removal and Full HD media capabilities in the JS SDK
- Contributed to Webex Web SDK 3.0 launch
- Tech used: JavaScript, TypeScript, React, WebRTC, Node.js

## Previous Role — Coditas
- Company: Coditas, Pune, India
- Title: Software Developer
- Period: September 2020 – January 2022
- Built a custom CMS using React (Hooks), TypeScript, Material UI
- Built RESTful backend services with NestJS using MongoDB aggregations
- Integrated third-party health platforms and wearable device APIs
- Tech used: React, TypeScript, NestJS, MongoDB, Material UI

## First Role — Metacube
- Company: Metacube, Jaipur, India
- Title: Software Engineer
- Period: July 2018 – September 2020
- Contributed to GSM-Osprey, a digital marketing platform for a US automotive company
- Built frontend with React.js and Redux for state management
- Built backend APIs with Node.js
- Used AWS serverless: API Gateway, Lambda, S3, SQS, Elasticsearch, CloudWatch, IAM, EC2
- Tech used: React, Redux, Node.js, AWS Lambda, S3, SQS, Elasticsearch

## Core Technical Skills
- Languages: TypeScript, JavaScript
- Frontend: React, Vue.js, Redux, Vite, Webpack, Microfrontends
- Backend: Node.js, NestJS, Express, GraphQL
- Databases: MongoDB, MySQL, Elasticsearch
- Cloud: AWS (Lambda, S3, EC2, CloudWatch, SQS, IAM, API Gateway)
- Testing: Jest, Cypress, Vitest
- DevOps: CI/CD, GitHub Actions, Git, GitLab
- Tools: Storybook, Postman, Optimizely, Lokalise, Mopinion, Figma
- AI: Langdock API integration, AI agent workflows, Claude Code, Copilot
- Other: WebRTC, WCAG accessibility, Agile/Scrum

## Education
- B.Tech in Electronics & Communication Engineering, Jaipur Engineering College, 2014–2018, CGPA 73.4%
- XII High School, Tagore International School, Jaipur, 2012–2014, 90%

## What kind of roles I am looking for
- Senior Frontend Engineer
- Full Stack Engineer
- Staff Engineer
- Open to: product companies, scale-ups, and engineering-led startups
- Sectors I enjoy: developer tools, e-commerce, SaaS, healthtech, fintech
- Not interested in: pure agency work, short-term contracts under 6 months

## Working style and environment
- Strong preference for TypeScript-first codebases
- Comfortable working across the stack — frontend-heavy but can own backend services
- Experienced with both monolith and microservice/microfrontend architectures
- Agile teams — comfortable with sprint planning, estimations, retros
- Can work independently or embedded in a cross-functional squad
- UTC+2 timezone (Berlin), available for overlap with US East in the morning

## Pre-answered FAQ
Q: Are you open to relocation?
A: I am already based in Berlin, Germany. I am open to in-person roles both in Berlin and other parts of Germany.

Q: What is your notice period?
A: Available with 1 month notice period — reach out to discuss.

Q: Do you have experience with AI?
A: Yes — I have integrated Langdock APIs to build AI agent workflows that automate internal delivery and documentation tasks. I use AI as a force multiplier in day-to-day engineering using Claude Code and copilot.

Q: What is your biggest technical achievement?
A: At Cisco, contributing to a JavaScript SDK that handled 2.5 million monthly meeting joins across telehealth, edtech, and airline platforms. At Kaufland, leading a Vue 2 to Vue 3 migration across 25+ components while simultaneously shipping high-impact features that drove a 22% adoption increase.

Q: Can you work with React and Vue both?
A: Yes — I use React at a senior level (Cisco, Metacube, Coditas) and Vue 3 at a senior level (Kaufland). I am comfortable switching between them.

Q: What are your salary expectations?
A: I prefer to discuss this directly — please reach out via email at dipanshusharma2510@gmail.com.
`;

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

  const recentMessages = messages.slice(-10);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 400,
        temperature: 0.6,
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
