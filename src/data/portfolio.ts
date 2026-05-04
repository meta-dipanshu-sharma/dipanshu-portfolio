// ============================================================
// PORTFOLIO DATA — single source of truth
// Pulled directly from the resume; structured for the UI.
// ============================================================

export type SkillCategory = 'core' | 'frontend' | 'backend' | 'cloud' | 'tooling' | 'ai';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: 'expert' | 'advanced' | 'proficient';
  /** Years of meaningful production usage (for the constellation). */
  years: number;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string; // ISO-ish: 2024-01
  end: string | 'present';
  tagline: string;
  metrics: { label: string; value: string }[];
  achievements: string[];
  stack: string[];
  domain: string;
  accent: 'cisco' | 'kaufland' | 'coditas' | 'metacube';
}

// ── PROFILE ────────────────────────────────────────────────
export const profile = {
  name: 'Dipanshu Sharma',
  initials: 'DS',
  title: 'FullStack Engineer',
  subtitle: 'Product-Minded Developer',
  location: 'Berlin, Germany',
  email: 'dipanshusharma2510@gmail.com',
  phone: '+49 151 23382340',
  linkedin: 'https://linkedin.com/in/sharma-dipanshu',
  github: 'https://github.com/meta-dipanshu-sharma',
  yearsExperience: 7,
  bio: `Software Engineer with 7+ years of full-stack experience designing and building scalable, high-performance frontends using JavaScript, TypeScript, and modern frameworks, with additional experience in Node.js based backend services and cloud environments.`,
  manifesto: [
    'I build for scale.',
    'I solve friction with AI.',
    'I architect for the next decade.',
  ],
};

// ── SKILLS — for the constellation visualization ───────────
export const skills: Skill[] = [
  // Core (the trunk of the T)
  { name: 'TypeScript', category: 'core', level: 'expert', years: 7 },
  { name: 'JavaScript', category: 'core', level: 'expert', years: 7 },
  { name: 'React', category: 'frontend', level: 'expert', years: 7 },
  { name: 'Vue', category: 'frontend', level: 'expert', years: 3 },
  { name: 'Redux', category: 'frontend', level: 'advanced', years: 7 },
  { name: 'Microfrontends', category: 'frontend', level: 'advanced', years: 4 },
  // Backend
  { name: 'Node.js', category: 'backend', level: 'expert', years: 7 },
  { name: 'NestJS', category: 'backend', level: 'advanced', years: 3 },
  { name: 'GraphQL', category: 'backend', level: 'advanced', years: 5 },
  { name: 'MongoDB', category: 'backend', level: 'proficient', years: 3 },
  { name: 'Microservices', category: 'backend', level: 'advanced', years: 4 },
  // Cloud
  { name: 'AWS Lambda', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'AWS S3', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'AWS CloudWatch', category: 'cloud', level: 'advanced', years: 3 },
  // Tooling
  { name: 'Vite', category: 'tooling', level: 'expert', years: 3 },
  { name: 'Webpack', category: 'tooling', level: 'expert', years: 7 },
  { name: 'Jest', category: 'tooling', level: 'expert', years: 7 },
  { name: 'Cypress', category: 'tooling', level: 'advanced', years: 4 },
  { name: 'GitHub Actions', category: 'tooling', level: 'advanced', years: 7 },
  // AI
  { name: 'Langdock API', category: 'ai', level: 'proficient', years: 1 },
  { name: 'Copilot', category: 'ai', level: 'expert', years: 2 },
  { name: 'Claude Code', category: 'ai', level: 'proficient', years: 1 },
];

// ── EXPERIENCE ─────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    company: 'Kaufland e-commerce',
    role: 'Software Developer',
    location: 'Berlin, Germany',
    period: '01/2024 — Present',
    start: '2024-01',
    end: 'present',
    tagline: 'Owning the Seller Portal and the Checkout experience for Kaufland’s European e-commerce platform.',
    domain: 'High-traffic European E-commerce',
    accent: 'kaufland',
    metrics: [
      { label: 'Single SPA', value: 'Microfrontend Architecture' },
      { label: 'Vue 2 -> Vue 3', value: 'Vue migration' },
      { label: 'Backend services orchestrated', value: 'BFF (Backend For Frontend)' },
      { label: 'Generating Seller Insights', value: 'AI agent with Langdock' },
      { label: 'Sellers adoption lift for OOH feature', value: '22%' },
      { label: 'Improved LCP', value: 'Core Web Vitals' },
    ],
    achievements: [
      'Owned and maintained a micro-frontend architecture across 4+ frontend repositories powering the Seller Portal Delivery & Return Experience.',
      'Led the end-to-end Vue 2 → Vue 3 migration across 25+ components and shared libraries, resolving breaking changes and reducing bundle size by ~15%.',
      'Engineered a TypeScript + GraphQL BFF layer orchestrating data across 6+ backend microservices, reducing frontend API complexity.',
      'Delivered Returnless Refunds, Return Label Reselling, and OOH delivery with location-based filtering — driving a 22% adoption increase in the first month.',
      'Implemented WCAG accessibility standards covering 90%+ of key user flows; introduced Jest unit testing reaching ~85% coverage on critical UI.',
      'Enabled data-driven decisions through GA4, GTM, and Optimizely feature-flag experimentation.',
    ],
    stack: ['Vue.js', 'TypeScript', 'GraphQL', 'Microfrontends', 'Node.js', 'Jest', 'Datadog', 'Optimizely', 'Lokalise'],
  },
  {
    company: 'Cisco Webex',
    role: 'Software Developer',
    location: 'Bengaluru, India',
    period: '01/2022 — 12/2023',
    start: '2022-01',
    end: '2023-12',
    tagline: 'Engineering enterprise collaboration at planet-scale.',
    domain: 'Real-time Communication · Enterprise SaaS',
    accent: 'cisco',
    metrics: [
      { label: 'Monthly meeting joins', value: '~2.5M' },
      { label: 'Calls supported', value: '100K+' },
      { label: 'React Browser-extension downloads at launch', value: '2K+' },
      { label: 'Full HD Video and Background Noise Reduction', value: 'SDK features shipped' },
      { label: 'Maintained as Dev playground', value: 'Kitchen Sink Apps' },
      { label: 'Maintained SDK Documentation', value: 'Developer Docs' },
    ],
    achievements: [
      'Engineered core features and performance optimizations for the Webex Web JavaScript SDK supporting ~2.5M monthly meeting joins and 100K+ calls.',
      'Developed the Webex Web Calling Client and browser extension in React, achieving 2K+ downloads at launch.',
      'Built and enhanced real-time audio/video communication features using WebRTC APIs, improving call stability under varying network conditions.',
      'Implemented background noise removal and Full HD media capabilities — shipped with Webex Web SDK 3.0.',
      'Maintained the "Kitchen Sink" demo apps powering the Webex Developer Portal — the primary entry point for external developers.',
    ],
    stack: ['React', 'JavaScript SDK', 'WebRTC', 'TypeScript', 'Browser Extensions'],
  },
  {
    company: 'Coditas',
    role: 'Software Developer',
    location: 'Pune, India',
    period: '09/2020 — 01/2022',
    start: '2020-09',
    end: '2022-01',
    tagline: 'Designing CMS-driven healthcare systems from the schema up.',
    domain: 'HealthTech · CMS Architecture',
    accent: 'coditas',
    metrics: [
      { label: 'Managing data for Fitness App', value: 'Custom CMS' },
      { label: 'Monolith backend service', value: 'NestJS' },
      { label: 'MongoDB', value: 'Data Aggregation' },
    ],
    achievements: [
      'Contributed to system architecture and database schema design for scalable CMS-driven healthcare applications.',
      'Designed and developed a custom CMS using React, TypeScript, and Material UI — establishing a reusable component-driven UI architecture.',
      'Built RESTful backend services with NestJS, leveraging MongoDB aggregations, migration scripts, and cron jobs.',
      'Integrated third-party health platforms and wearable device APIs for secure real-time data synchronization.',
      'Drove technical planning, estimations, and sprint delivery in an agile environment.',
    ],
    stack: ['React', 'TypeScript', 'Material UI', 'NestJS', 'MongoDB'],
  },
  {
    company: 'Metacube',
    role: 'Software Engineer',
    location: 'Jaipur, India',
    period: '07/2018 — 09/2020',
    start: '2018-07',
    end: '2020-09',
    tagline: 'Shipping serverless campaign tooling for U.S. auto-marketing.',
    domain: 'AdTech · Serverless on AWS',
    accent: 'metacube',
    metrics: [
      { label: 'MERN stack', value: 'Web APP' },
      { label: 'AWS services orchestrated', value: '7+' },
      { label: 'Serverless Architecture', value: 'Event-driven' },
    ],
    achievements: [
      'Contributed to GSM-Osprey, a core digital marketing platform for a leading U.S.-based automotive marketing company.',
      'Developed React.js frontend (functional, stateful, and HOCs) with Redux for state management.',
      'Built scalable RESTful Node.js backend APIs and business logic.',
      'Worked with serverless architecture on AWS — API Gateway, Lambda, S3, SQS, Elasticsearch, CloudWatch, IAM, EC2.',
      'Designed and scheduled automated background jobs using AWS Scheduler (cron-based workflows).',
    ],
    stack: ['React', 'Redux', 'Node.js', 'AWS Lambda', 'Elasticsearch', 'MySQL', 'Postman'],
  },
];

// ── EDUCATION ──────────────────────────────────────────────
export const education = [
  {
    school: 'Jaipur Engineering College and Research Centre',
    degree: 'B.Tech, Electronics & Communication Engineering',
    period: '2014 — 2018',
    grade: 'CGPA 73.4%',
    location: 'Jaipur, India',
  },
  {
    school: 'Tagore International School',
    degree: 'XII (High School)',
    period: '2012 — 2014',
    grade: '90%',
    location: 'Jaipur, India',
  },
];
