import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Agentic AI and how does it differ from traditional automation?",
    answer: "Agentic AI refers to AI systems that can autonomously pursue goals, make decisions, and take actions without constant human intervention. Unlike traditional automation that follows fixed rules, agentic AI adapts to changing conditions, learns from outcomes, and optimizes its approach over time. Our agents can handle complex, multi-step workflows that would be impossible to pre-program.",
  },
  {
    question: "How quickly can AgenticForce be integrated with our existing tech stack?",
    answer: "Most integrations are completed within 2-4 weeks. We offer no-code connectors for 500+ popular platforms including Salesforce, HubSpot, Marketo, Google Analytics, and major ad platforms. For custom integrations, our team provides full API support and can build custom connectors as needed.",
  },
  {
    question: "What security measures protect our data?",
    answer: "AgenticForce is SOC 2 Type II certified with enterprise-grade security. All data is encrypted at rest and in transit. We offer role-based access controls, audit logging, and optional on-premise deployment. Your data is never used to train our models without explicit consent, and we provide full data isolation between clients.",
  },
  {
    question: "How does the AI learn and improve over time?",
    answer: "Our AI uses reinforcement learning from human feedback (RLHF) combined with outcome-based optimization. The system continuously monitors KPIs you define, learns from successful outcomes, and adjusts its strategies accordingly. All changes are guardrailed to prevent degradation and require approval for major strategy shifts.",
  },
  {
    question: "What kind of ROI can we expect?",
    answer: "Our clients typically see 30-40% reduction in customer acquisition costs, 50%+ improvement in lead response times, and 2-3x increases in campaign performance within the first 90 days. We provide detailed ROI tracking and guarantee measurable improvements or your investment back.",
  },
  {
    question: "Do you offer support for startups and smaller businesses?",
    answer: "Yes! We have dedicated startup programs with flexible pricing, extended onboarding support, and access to our full platform. Startups benefit from AI-first strategies that help level the playing field against larger competitors. Contact us for startup-specific packages.",
  },
];

export const FAQ = () => {
  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about AgenticForce and our AI solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="text-left font-heading font-semibold hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
