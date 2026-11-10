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
- Years of experience: 8+
- Currently open to: Senior Full Stack, Senior Frontend, and Staff Engineer roles
- Preferred work: Berlin or anywhere in Germany
- Available: Yes, open to new roles
- Start date: flexible; reach out to discuss timing

## Most Recent Role — Kaufland e-commerce
- Company: Kaufland e-commerce, Berlin
- Title: Software Developer
- Period: January 2024 – July 2026
- What I did: Owned the checkout journey across a Nuxt/Vue 3 storefront and Fastify microservices, managing the order creation experience for 9 markets
- Delivered payment fee calculation into Tableau via an SQS/SNS event consumer, so finance could analyse PSP costs per transaction and per market
- Audited checkout SLIs/SLOs against production data and defined user-journey-based SLIs and the checkout alerting roadmap
- Built Kubernetes cron jobs (floating-payment detection, expired-payment cancellation, Klarna authorisation extension) with Prometheus metrics and Grafana dashboards, reducing operations team manual effort by 70%
- Created a Claude Code skill that reconciles orders paid at the PSP but still pending in Commercetools, turning a manual investigation into a one-step sync
- Shipped an Unzer instalments widget on product pages with a Redis-cached backend plans endpoint, giving shoppers transparent instalment plans
- Domain: payments and checkout (PSPs, BNPL/Klarna, Unzer instalments), observability, event-driven services
- Tech used: Nuxt, Vue 3, TypeScript, Fastify, AWS SQS/SNS, Kubernetes, Redis, Commercetools, Prometheus, Grafana, Tableau, Claude Code

## Previous Role — Cisco Webex
- Company: Cisco Webex, Bengaluru, India
- Title: Software Developer
- Period: January 2022 – December 2023
- Engineered core features and performance optimisations for the Webex Web JS SDK powering ~2.5M monthly meeting joins across third-party integrations
- Developed the Webex Web Calling Client and browser extension in React, reaching 2K+ downloads at launch
- Built real-time audio/video features on WebRTC, improving call stability under poor network conditions
- Shipped background noise removal and Full HD media for the Webex Web SDK 3.0 launch
- Maintained the "Kitchen Sink" demo apps that validate the SDK for the Webex Developer Portal
- Tech used: JavaScript, TypeScript, React, WebRTC, Node.js

## Previous Role — Coditas
- Company: Coditas, Pune, India
- Title: Software Developer
- Period: September 2020 – January 2022
- Designed system architecture and database schemas for scalable CMS-driven healthcare applications
- Built a custom CMS with React, TypeScript and Material UI, establishing a reusable component library across modules
- Developed NestJS RESTful services with MongoDB aggregations, migrations and cron jobs for reporting workflows
- Integrated third-party health platforms and wearable APIs for secure real-time data sync
- Tech used: React, TypeScript, NestJS, MongoDB, Material UI

## First Role — Metacube
- Company: Metacube, Jaipur, India
- Title: Software Engineer
- Period: July 2018 – September 2020
- Developed GSM-Osprey, a digital marketing platform managing dealer assets and campaigns for a leading U.S. automotive marketer
- Built React/Redux frontend features and Node.js RESTful backend services
- Delivered serverless, event-driven solutions on AWS (API Gateway, Lambda, S3, SQS, Elasticsearch, CloudWatch)
- Designed automated background jobs with AWS Scheduler (cron-based workflows)
- Tech used: React, Redux, Node.js, AWS Lambda, S3, SQS, Elasticsearch

## Summary
Software Engineer with 8+ years of full stack experience building scalable, high-performance applications with TypeScript, Vue/React frontends and Node.js microservices on AWS and Kubernetes. Proven expertise in frontend architecture, payment and checkout systems, event-driven services, observability (Grafana, Prometheus, SLOs), CI/CD and automated testing, with strong ownership of technical decisions and close collaboration with product, design and cross-functional stakeholders.

## Core Technical Skills
- Languages: TypeScript, JavaScript
- Frontend: Vue (Vue 3, Nuxt), React (React.js, Next.js, Redux), Microfrontends, Material UI, Storybook, Vite, Webpack
- Backend: Node.js, Fastify, NestJS, Express, GraphQL, Microservices, Event-driven architecture (AWS SQS/SNS)
- Databases: PostgreSQL, Redis, MongoDB, MySQL, Elasticsearch
- Commerce & payments: Commercetools, Talon.One, Contentstack, payment lifecycle management (PSPs, BNPL)
- Cloud & infrastructure: AWS (Lambda, S3, EC2, CloudWatch, SQS/SNS), Kubernetes, Docker
- Observability: Grafana, Prometheus, Datadog, SLIs/SLOs
- Testing: Jest, Vitest, Cypress, Playwright
- DevOps: CI/CD, GitHub Actions
- Product & experimentation: Optimizely, Figma
- AI: Claude Code (including custom skills), Copilot; this portfolio's chatbot is a RAG-style assistant built on Groq
- Other: WebRTC

## Education
- B.Tech in Electronics & Communication Engineering, Jaipur Engineering College, 2014–2018, CGPA 73.4%
- XII High School, Tagore International School, Jaipur, 2012–2014, 90%

## What kind of roles I am looking for
- Senior Full Stack Engineer
- Senior Frontend Engineer
- Staff Engineer
- Open to: product companies, scale-ups, and engineering-led startups
- Sectors I enjoy: developer tools, e-commerce, SaaS, healthtech, fintech
- Not interested in: pure agency work, short-term contracts under 6 months

## Working style and environment
- Strong preference for TypeScript-first codebases
- Full stack: owns Vue/React frontends as well as Node.js microservices, event consumers and Kubernetes jobs
- Experienced with monolith, microservice, microfrontend and event-driven architectures
- Agile teams — comfortable with sprint planning, estimations, retros
- Can work independently or embedded in a cross-functional squad
- UTC+2 timezone (Berlin), available for overlap with US East in the morning

## Pre-answered FAQ
Q: Are you open to relocation?
A: I am already based in Berlin, Germany. I am open to in-person roles both in Berlin and other parts of Germany.

Q: When can you start?
A: I am open to new roles and flexible on start date — reach out to discuss timing.

Q: Do you have experience with AI?
A: Yes — at Kaufland I built a Claude Code skill that reconciles orders paid at the PSP but pending in Commercetools, turning a manual investigation into a one-step sync. I use AI as a force multiplier in day-to-day engineering using Claude Code and Copilot, and this portfolio's chatbot is a RAG-style assistant I built myself.

Q: What is your biggest technical achievement?
A: At Cisco, contributing to the Webex Web JS SDK powering ~2.5 million monthly meeting joins across third-party integrations. At Kaufland, owning the checkout for 9 markets and building Kubernetes cron jobs with Prometheus/Grafana monitoring for payment edge cases, which cut the operations team's manual effort by 70%.

Q: Can you work with React and Vue both?
A: Yes — I use React at a senior level (Cisco, Metacube, Coditas) and Vue 3 / Nuxt at a senior level (Kaufland). I am comfortable switching between them.

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
