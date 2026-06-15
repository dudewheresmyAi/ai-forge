export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readTime: string;
  tags: string[];
  body: { heading: string; paragraphs: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "death-of-the-sdr-stack",
    title: "The Death of the SDR Stack",
    excerpt:
      "Why classic sales engagement tools are about to be replaced by a single autonomous agent — and what teams should do this quarter.",
    author: "Maya Chen",
    date: "2026-06-02",
    readTime: "8 min read",
    tags: ["Agents", "Sales", "Strategy"],
    body: [
      {
        heading: "The 12-tool stack is collapsing",
        paragraphs: [
          "For a decade, outbound teams stitched together sequencers, enrichers, dialers, schedulers, and analytics layers. Each tool was a Band-Aid on the previous tool's blind spot.",
          "An autonomous agent collapses that stack into a single reasoning loop: identify, research, draft, send, follow up, qualify, schedule — all from one runtime grounded in your CRM.",
        ],
      },
      {
        heading: "What replaces the SDR seat",
        paragraphs: [
          "It is not a chatbot. It is a long-running process that owns a pipeline target, makes thousands of micro-decisions per day, and reports outcomes — not activity — back to revenue leaders.",
        ],
      },
      {
        heading: "What to do this quarter",
        paragraphs: [
          "Pick one motion (outbound, lifecycle, or expansion). Replace the tooling under it with a single agent. Measure pipeline-per-dollar instead of activity volume.",
        ],
      },
    ],
  },
  {
    slug: "designing-self-optimizing-funnels",
    title: "Designing Self-Optimizing Funnels",
    excerpt:
      "A practical guide to building feedback loops that let your agents get measurably better every week without human intervention.",
    author: "Devon Park",
    date: "2026-05-21",
    readTime: "11 min read",
    tags: ["Funnels", "Optimization", "Playbook"],
    body: [
      {
        heading: "Start with the outcome signal",
        paragraphs: [
          "Self-optimizing funnels require a clean, attributable outcome signal — booked meeting, paid conversion, retained user. Without it, the agent has nothing to learn from.",
        ],
      },
      {
        heading: "Close the loop in under 7 days",
        paragraphs: [
          "Loops that take longer than a week to close stall learning. Compress the signal pathway with synthetic milestones (engagement, reply intent) that correlate with outcomes.",
        ],
      },
      {
        heading: "Let the agent own the variants",
        paragraphs: [
          "Stop A/B testing copy by hand. Give the agent the goal, the constraints, and the brand voice — then let it generate, ship, and prune variants on its own.",
        ],
      },
    ],
  },
  {
    slug: "lessons-from-10m-agent-actions",
    title: "What We Learned Running 10M Agent Actions",
    excerpt:
      "Lessons on reliability, cost, and human trust from one year of running autonomous agents in production at scale.",
    author: "Priya Anand",
    date: "2026-05-04",
    readTime: "14 min read",
    tags: ["Reliability", "Production", "Cost"],
    body: [
      {
        heading: "Cost is a design decision, not a bill",
        paragraphs: [
          "Token cost is set during system design — model routing, context budgeting, and caching decide 80% of the bill. The remaining 20% is usage growth.",
        ],
      },
      {
        heading: "Reliability comes from idempotency",
        paragraphs: [
          "Treat every external action as idempotent. Retries, partial failures, and human takeovers stop being scary once the runtime guarantees no double-sends.",
        ],
      },
      {
        heading: "Trust is earned through visibility",
        paragraphs: [
          "Humans trust agents they can inspect. Surface every decision, every tool call, and every dropped action in a timeline view your operators actually read.",
        ],
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
