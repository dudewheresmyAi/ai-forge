export type StaticPage = {
  title: string;
  category: string;
  description: string;
  sections: { heading: string; body: string }[];
};

const make = (
  title: string,
  category: string,
  description: string,
  sections: { heading: string; body: string }[]
): StaticPage => ({ title, category, description, sections });

export const staticPages: Record<string, StaticPage> = {
  // Product
  features: make(
    "Features",
    "Product",
    "Everything you need to deploy autonomous AI agents that re-engineer revenue across your business.",
    [
      { heading: "Autonomous Workflows", body: "Deploy self-optimizing agents that handle prospecting, qualification, outreach, and follow-up without human babysitting." },
      { heading: "Multi-Model Orchestration", body: "Route tasks across the best models for each job — reasoning, vision, voice, code — through a single intelligent gateway." },
      { heading: "Real-Time Analytics", body: "Watch agent performance, conversion lifts, and revenue attribution update live as workflows run." },
      { heading: "Enterprise Controls", body: "Granular role-based access, audit logs, PII redaction, and policy guardrails on every agent action." },
    ]
  ),
  integrations: make(
    "Integrations",
    "Product",
    "Plug AgenticForce into the stack you already run — CRM, comms, data, and billing.",
    [
      { heading: "CRM & Sales", body: "Salesforce, HubSpot, Pipedrive, Attio. Bi-directional sync for contacts, deals, and activity." },
      { heading: "Communications", body: "Gmail, Outlook, Slack, Twilio, WhatsApp. Agents speak in whichever channel your customer prefers." },
      { heading: "Data Warehouses", body: "Snowflake, BigQuery, Postgres, Redshift. Ground agents in your first-party data." },
      { heading: "Billing & Ops", body: "Stripe, Paddle, QuickBooks, Zapier. Close the loop from action to revenue." },
    ]
  ),
  pricing: make(
    "Pricing",
    "Product",
    "Transparent pricing that scales with the value your agents deliver.",
    [
      { heading: "Starter", body: "$49/mo — 1 agent, 5k actions, community support. For founders validating their first workflow." },
      { heading: "Pro", body: "$199/mo — 5 agents, 50k actions, priority support, advanced analytics. For growing teams." },
      { heading: "Enterprise", body: "Custom — unlimited agents, SSO/SAML, dedicated success, custom SLAs, on-prem option." },
    ]
  ),
  changelog: make(
    "Changelog",
    "Product",
    "Ship logs from the AgenticForce team — new features, fixes, and model upgrades.",
    [
      { heading: "v2.4 — June 2026", body: "Added shader-backed dashboard themes, mouse-repelling particles, and 3x faster agent cold-starts." },
      { heading: "v2.3 — May 2026", body: "New Paddle billing integration, parallax scrolling effects, and improved typewriter onboarding." },
      { heading: "v2.2 — April 2026", body: "Multi-model routing, voice agents (beta), and SOC 2 Type II certification completed." },
    ]
  ),
  roadmap: make(
    "Roadmap",
    "Product",
    "What we're building next. Vote on items in the community to shape the future of AgenticForce.",
    [
      { heading: "Now", body: "Agent marketplace, native mobile app, and fine-tuned vertical models for fintech and healthcare." },
      { heading: "Next", body: "Visual workflow builder, autonomous A/B testing, and offline-first edge agents." },
      { heading: "Later", body: "Multi-agent negotiation protocols, on-prem deployment toolkit, and full-stack revenue attribution." },
    ]
  ),

  // Company
  about: make(
    "About",
    "Company",
    "We're building the autonomous revenue layer for the next generation of companies.",
    [
      { heading: "Our Mission", body: "Free human teams from repetitive revenue work so they can focus on strategy, creativity, and relationships." },
      { heading: "Our Story", body: "Founded in 2024 by a team of ex-OpenAI, Stripe, and Salesforce engineers who saw AI eat workflow after workflow." },
      { heading: "Our Values", body: "Customer obsession. Bias to ship. Honest with ourselves. Compounding excellence." },
    ]
  ),
  blog: make(
    "Blog",
    "Company",
    "Essays, playbooks, and field notes from the autonomous-revenue frontier.",
    [
      { heading: "The Death of the SDR Stack", body: "Why classic sales engagement tools are about to be replaced by a single autonomous agent." },
      { heading: "Designing Self-Optimizing Funnels", body: "A practical guide to building feedback loops that let your agents get better every week." },
      { heading: "What We Learned Running 10M Agent Actions", body: "Lessons on reliability, cost, and human trust from one year in production." },
    ]
  ),
  careers: make(
    "Careers",
    "Company",
    "Join a small, senior team building the autonomous revenue layer for every business.",
    [
      { heading: "Founding Engineer — Agents", body: "Own the agent runtime end-to-end. Strong TypeScript and distributed systems experience required." },
      { heading: "Product Designer", body: "Design interfaces for non-deterministic systems. Motion, density, and clarity obsessives welcome." },
      { heading: "GTM Lead", body: "Build the first revenue org. You'll partner with founders and use our own product to do it." },
    ]
  ),
  press: make(
    "Press",
    "Company",
    "Coverage, brand assets, and media inquiries for AgenticForce.",
    [
      { heading: "In the News", body: "Featured in TechCrunch, The Information, and Forbes for redefining the AI sales category." },
      { heading: "Brand Assets", body: "Download logos, product screenshots, and approved color tokens for editorial use." },
      { heading: "Media Contact", body: "For interviews and quotes: press@agenticforce.ai" },
    ]
  ),
  partners: make(
    "Partners",
    "Company",
    "Build, resell, or integrate AgenticForce. Our partner network spans agencies, consultants, and platforms.",
    [
      { heading: "Solution Partners", body: "Implementation agencies trained and certified to deploy AgenticForce inside enterprise customers." },
      { heading: "Technology Partners", body: "Co-build native integrations and joint go-to-market with leading SaaS platforms." },
      { heading: "Become a Partner", body: "Apply to the program and get co-marketing, revenue share, and dedicated partner engineering." },
    ]
  ),

  // Resources
  documentation: make(
    "Documentation",
    "Resources",
    "Everything you need to build, deploy, and operate AgenticForce agents in production.",
    [
      { heading: "Quickstart", body: "Spin up your first agent in under 5 minutes with our hosted onboarding flow." },
      { heading: "Core Concepts", body: "Agents, workflows, tools, memory, and policies — the foundation of the platform." },
      { heading: "Deployment", body: "Environments, secrets, versioning, and rollback patterns for production agents." },
    ]
  ),
  "api-reference": make(
    "API Reference",
    "Resources",
    "REST and streaming APIs for programmatic control over agents, runs, and analytics.",
    [
      { heading: "Authentication", body: "Bearer tokens, workspace-scoped keys, and short-lived OAuth for partner apps." },
      { heading: "Agents", body: "Create, update, run, and inspect agents with full lifecycle control." },
      { heading: "Webhooks", body: "Subscribe to run events, tool invocations, and outcome signals in real time." },
    ]
  ),
  guides: make(
    "Guides",
    "Resources",
    "Step-by-step playbooks for the most common AgenticForce use cases.",
    [
      { heading: "Outbound Prospecting Agent", body: "From ICP definition to first reply — build a full pipeline-generating agent in a day." },
      { heading: "Lifecycle Email Agent", body: "Replace drip campaigns with an agent that reasons about every individual user." },
      { heading: "Support Triage Agent", body: "Route, summarize, and auto-resolve tickets at the inbox layer." },
    ]
  ),
  "case-studies": make(
    "Case Studies",
    "Resources",
    "Real teams, real numbers. How AgenticForce customers compound revenue with autonomous agents.",
    [
      { heading: "Vector Labs — 4.2x Pipeline", body: "Replaced a 6-person SDR team with one agent. Booked 4.2x more qualified meetings in 90 days." },
      { heading: "Northwind SaaS — 38% NRR Lift", body: "Lifecycle agent identified expansion signals and drove a 38% net revenue retention improvement." },
      { heading: "Helix Health — 71% Auto-Resolved", body: "Support triage agent now auto-resolves 71% of tier-1 tickets, freeing humans for complex cases." },
    ]
  ),
  support: make(
    "Support",
    "Resources",
    "We're here to help — community, docs, and white-glove enterprise support.",
    [
      { heading: "Community", body: "Join 5,000+ builders in the AgenticForce community Slack for peer help and weekly office hours." },
      { heading: "Email Support", body: "support@agenticforce.ai — typical response within 4 business hours for Pro customers." },
      { heading: "Enterprise", body: "Dedicated Slack channel, named CSM, and 24/7 on-call for Enterprise plans." },
    ]
  ),

  // Legal
  "privacy-policy": make(
    "Privacy Policy",
    "Legal",
    "How we collect, use, and protect your data. Last updated June 2026.",
    [
      { heading: "Data We Collect", body: "Account information, usage telemetry, and the content you submit to agents for processing." },
      { heading: "How We Use It", body: "To operate the service, improve agent quality, and meet legal obligations. We never sell personal data." },
      { heading: "Your Rights", body: "Access, export, correct, or delete your data at any time. Email privacy@agenticforce.ai." },
    ]
  ),
  "terms-of-service": make(
    "Terms of Service",
    "Legal",
    "The legal agreement between you and AgenticForce. Last updated June 2026.",
    [
      { heading: "Acceptable Use", body: "Don't use AgenticForce to build agents that violate law, harass people, or generate harmful content." },
      { heading: "Subscriptions & Billing", body: "Plans renew automatically. Cancel anytime; access continues through the end of the paid period." },
      { heading: "Liability", body: "Service is provided as-is. Our aggregate liability is capped at fees paid in the preceding 12 months." },
    ]
  ),
  security: make(
    "Security",
    "Legal",
    "How we keep your data, agents, and customers safe.",
    [
      { heading: "Infrastructure", body: "Hosted on tier-1 cloud providers with encryption in transit (TLS 1.3) and at rest (AES-256)." },
      { heading: "Access Controls", body: "SSO/SAML, SCIM provisioning, role-based access, and full audit logging on every action." },
      { heading: "Responsible Disclosure", body: "Found a vulnerability? Email security@agenticforce.ai — we run a paid bounty program." },
    ]
  ),
  gdpr: make(
    "GDPR",
    "Legal",
    "AgenticForce is built for GDPR compliance from the ground up.",
    [
      { heading: "Lawful Basis", body: "We process personal data under contract, legitimate interest, and explicit consent as appropriate." },
      { heading: "Data Processing Addendum", body: "Standard DPA available on request, including SCCs for international data transfers." },
      { heading: "Data Subject Requests", body: "Submit access, rectification, or deletion requests to dpo@agenticforce.ai. We respond within 30 days." },
    ]
  ),
  "soc-2": make(
    "SOC 2",
    "Legal",
    "AgenticForce is SOC 2 Type II certified across Security, Availability, and Confidentiality.",
    [
      { heading: "Our Report", body: "Current SOC 2 Type II report covering a 12-month observation window, audited by an independent CPA firm." },
      { heading: "Continuous Monitoring", body: "Controls are monitored continuously with Drata; deviations alert our security team in real time." },
      { heading: "Request the Report", body: "Available under NDA to current and prospective customers. Email trust@agenticforce.ai." },
    ]
  ),
};
