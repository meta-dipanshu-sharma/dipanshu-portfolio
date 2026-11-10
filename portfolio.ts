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
  title: 'Full Stack Engineer',
  subtitle: 'Product-Minded Developer',
  location: 'Berlin, Germany',
  email: 'dipanshusharma2510@gmail.com',
  phone: '+49 151 23382340',
  linkedin: 'https://linkedin.com/in/sharma-dipanshu',
  github: 'https://github.com/meta-dipanshu-sharma',
  yearsExperience: 8,
  bio: `Software Engineer with 8+ years of full stack experience building scalable, high-performance applications with TypeScript, Vue/React frontends and Node.js microservices on AWS and Kubernetes. Proven expertise in frontend architecture, payment and checkout systems, event-driven services, observability (Grafana, Prometheus, SLOs), CI/CD and automated testing, with strong ownership of technical decisions and close collaboration with product, design and cross-functional stakeholders.`,
  manifesto: [
    'I build for scale.',
    'I solve friction with AI.',
    'I architect for the next decade.',
  ],
};

// ── SKILLS — for the constellation visualization ───────────
export const skills: Skill[] = [
  // Core (the trunk of the T)
  { name: 'TypeScript', category: 'core', level: 'expert', years: 8 },
  { name: 'JavaScript', category: 'core', level: 'expert', years: 8 },
  { name: 'React', category: 'frontend', level: 'expert', years: 7 },
  { name: 'Vue', category: 'frontend', level: 'expert', years: 3 },
  { name: 'Nuxt', category: 'frontend', level: 'advanced', years: 3 },
  { name: 'Redux', category: 'frontend', level: 'expert', years: 7 },
  { name: 'Microfrontends', category: 'frontend', level: 'advanced', years: 4 },
  // Backend
  { name: 'Node.js', category: 'backend', level: 'expert', years: 8 },
  { name: 'Fastify', category: 'backend', level: 'advanced', years: 3 },
  { name: 'NestJS', category: 'backend', level: 'advanced', years: 3 },
  { name: 'GraphQL', category: 'backend', level: 'advanced', years: 5 },
  { name: 'Microservices', category: 'backend', level: 'advanced', years: 4 },
  { name: 'PostgreSQL', category: 'backend', level: 'proficient', years: 2 },
  { name: 'Redis', category: 'backend', level: 'proficient', years: 3 },
  { name: 'MongoDB', category: 'backend', level: 'proficient', years: 3 },
  // Cloud, infrastructure & observability
  { name: 'Kubernetes', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'AWS SQS/SNS', category: 'cloud', level: 'advanced', years: 5 },
  { name: 'AWS Lambda', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'AWS S3', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'Docker', category: 'cloud', level: 'proficient', years: 3 },
  { name: 'Prometheus', category: 'cloud', level: 'advanced', years: 3 },
  { name: 'Grafana', category: 'cloud', level: 'advanced', years: 3 },
  // Tooling
  { name: 'Vite', category: 'tooling', level: 'expert', years: 3 },
  { name: 'Webpack', category: 'tooling', level: 'expert', years: 7 },
  { name: 'Jest', category: 'tooling', level: 'expert', years: 7 },
  { name: 'Vitest', category: 'tooling', level: 'expert', years: 3 },
  { name: 'Cypress', category: 'tooling', level: 'advanced', years: 4 },
  { name: 'Playwright', category: 'tooling', level: 'proficient', years: 2 },
  { name: 'Storybook', category: 'tooling', level: 'advanced', years: 4 },
  { name: 'GitHub Actions', category: 'tooling', level: 'advanced', years: 7 },
  { name: 'Datadog', category: 'tooling', level: 'advanced', years: 3 },
  { name: 'Figma', category: 'tooling', level: 'advanced', years: 4 },
  // AI
  { name: 'Claude Code', category: 'ai', level: 'advanced', years: 1 },
  { name: 'Copilot', category: 'ai', level: 'expert', years: 2 },
];

// ── EXPERIENCE ─────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    company: 'Kaufland e-commerce',
    role: 'Software Developer',
    location: 'Berlin, Germany',
    period: '01/2024 — 07/2026',
    start: '2024-01',
    end: '2026-07',
    tagline: 'Owning the checkout journey and payment lifecycle for Kaufland’s marketplace across 9 European markets.',
    domain: 'High-traffic European E-commerce · Payments',
    accent: 'kaufland',
    metrics: [
      { label: 'Markets served by the checkout', value: '9' },
      { label: 'Less manual ops effort via K8s cron jobs', value: '70%' },
      { label: 'Nuxt / Vue 3 + Fastify', value: 'Checkout ownership' },
      { label: 'PSP cost per transaction in Tableau', value: 'SQS/SNS consumer' },
      { label: 'Journey-based SLIs + alerting roadmap', value: 'SLO audit' },
      { label: 'PSP ↔ Commercetools order reconciliation', value: 'Claude Code skill' },
    ],
    achievements: [
      'Owned the checkout journey across a Nuxt/Vue 3 storefront and Fastify microservices, managing the order creation experience for 9 markets.',
      'Delivered payment fee calculation into Tableau via an SQS/SNS event consumer, enabling finance to analyse PSP costs per transaction and market.',
      'Audited checkout SLIs/SLOs against production data and defined user-journey-based SLIs and the checkout alerting roadmap.',
      'Built Kubernetes cron jobs (floating-payment detection, expired-payment cancellation, Klarna authorisation extension) with Prometheus metrics and Grafana dashboards, reducing operations team manual effort by 70%.',
      'Created a Claude Code skill that reconciles orders paid at the PSP but pending in Commercetools, turning a manual investigation into a one-step sync.',
      'Shipped an Unzer instalments widget on product pages with a Redis-cached backend plans endpoint, giving shoppers transparent instalment plans.',
    ],
    stack: ['Nuxt', 'Vue 3', 'TypeScript', 'Fastify', 'AWS SQS/SNS', 'Kubernetes', 'Redis', 'Commercetools', 'Prometheus', 'Grafana', 'Claude Code'],
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
            { label: 'Browser-extension downloads at launch', value: '2K+' },
      { label: 'Full HD Video and Background Noise Reduction', value: 'SDK features shipped' },
      { label: 'Maintained as Dev playground', value: 'Kitchen Sink Apps' },
      { label: 'WebRTC call stability on poor networks', value: 'Real-time A/V' },
    ],
    achievements: [
      'Engineered core features and performance optimisations for the Webex Web JS SDK powering ~2.5M monthly meeting joins across third-party integrations.',
      'Developed the Webex Web Calling Client and browser extension in React, reaching 2K+ downloads at launch.',
      'Built real-time audio/video features on WebRTC, improving call stability under poor network conditions.',
      'Shipped background noise removal and Full HD media for the Webex Web SDK 3.0 launch.',
      'Maintained the “Kitchen Sink” demo apps that validate the SDK for the Webex Developer Portal.',
    ],
    stack: ['React', 'TypeScript', 'JavaScript SDK', 'WebRTC', 'Browser Extensions'],
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
      { label: 'Reusable component library', value: 'Custom CMS' },
      { label: 'REST services + cron reporting', value: 'NestJS' },
      { label: 'Health platforms & wearables', value: 'API integrations' },
    ],
    achievements: [
      'Designed system architecture and database schemas for scalable CMS-driven healthcare applications.',
      'Built a custom CMS with React, TypeScript and Material UI, establishing a reusable component library across modules.',
      'Developed NestJS RESTful services with MongoDB aggregations, migrations and cron jobs for reporting workflows.',
      'Integrated third-party health platforms and wearable APIs for secure real-time data sync.',
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
      { label: 'Dealer assets & campaigns', value: 'GSM-Osprey' },
      { label: 'AWS services orchestrated', value: '7+' },
      { label: 'Serverless Architecture', value: 'Event-driven' },
    ],
    achievements: [
      'Developed GSM-Osprey, a digital marketing platform managing dealer assets and campaigns for a leading U.S. automotive marketer.',
      'Built React/Redux frontend features and Node.js RESTful backend services.',
      'Delivered serverless, event-driven solutions on AWS (API Gateway, Lambda, S3, SQS, Elasticsearch, CloudWatch).',
      'Designed automated background jobs with AWS Scheduler (cron-based workflows).',
    ],
    stack: ['React', 'Redux', 'Node.js', 'AWS Lambda', 'AWS SQS', 'Elasticsearch', 'MySQL'],
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
