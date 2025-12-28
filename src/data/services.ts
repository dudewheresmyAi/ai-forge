import { 
  Bot, 
  Zap, 
  Share2, 
  Target, 
  BarChart3, 
  Megaphone, 
  Palette, 
  Rocket,
  LucideIcon
} from "lucide-react";

export interface ServiceData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  features: string[];
  pricing: {
    starting: string;
    includes: string[];
  };
}

export const services: ServiceData[] = [
  {
    id: "agentic-ai",
    icon: Bot,
    title: "Agentic AI Solutions",
    description: "Deploy autonomous AI agents that handle complex workflows, make decisions, and continuously improve their performance.",
    fullDescription: "Our Agentic AI Solutions represent the cutting edge of artificial intelligence. These autonomous agents don't just follow scripts—they learn, adapt, and make intelligent decisions in real-time. From customer service to sales automation, our AI agents handle complex multi-step workflows with human-like reasoning while continuously improving their performance through machine learning.",
    benefits: [
      "24/7 autonomous operation without human intervention",
      "Self-improving algorithms that get smarter over time",
      "Seamless integration with your existing tech stack",
      "Reduce operational costs by up to 60%",
      "Handle thousands of concurrent interactions"
    ],
    features: [
      "Multi-agent orchestration",
      "Natural language understanding",
      "Decision tree automation",
      "Real-time learning & adaptation",
      "Custom workflow builders",
      "API integrations"
    ],
    pricing: {
      starting: "$2,997/mo",
      includes: [
        "Up to 10 AI agents",
        "Unlimited conversations",
        "Custom training",
        "Priority support",
        "Analytics dashboard"
      ]
    }
  },
  {
    id: "ai-automations",
    icon: Zap,
    title: "AI Automations",
    description: "Eliminate repetitive tasks with intelligent automation that adapts to your processes and scales with your growth.",
    fullDescription: "Transform your business operations with intelligent automation that goes beyond simple rules. Our AI Automations learn from your processes, identify bottlenecks, and continuously optimize workflows. From data entry to complex approval chains, automate any repetitive task while maintaining the flexibility to handle exceptions intelligently.",
    benefits: [
      "Reduce manual work by 80%",
      "Eliminate human error in routine tasks",
      "Scale operations without adding headcount",
      "Free your team for high-value work",
      "Real-time process optimization"
    ],
    features: [
      "Intelligent process mining",
      "No-code automation builder",
      "Exception handling AI",
      "Cross-platform connectors",
      "Scheduled & triggered workflows",
      "Audit trail & compliance"
    ],
    pricing: {
      starting: "$1,497/mo",
      includes: [
        "Unlimited automations",
        "50+ integrations",
        "Process analytics",
        "Custom triggers",
        "Team collaboration"
      ]
    }
  },
  {
    id: "ai-social-media",
    icon: Share2,
    title: "AI Social Media",
    description: "AI-powered content creation, scheduling, and engagement optimization across all major platforms.",
    fullDescription: "Dominate social media with AI that understands your brand voice and audience. Our AI Social Media platform creates compelling content, optimizes posting schedules, and engages with your community—all while learning what resonates best. From viral hooks to conversion-focused captions, let AI supercharge your social presence.",
    benefits: [
      "10x content output with consistent quality",
      "Optimal posting times for maximum reach",
      "Automated engagement and community management",
      "Cross-platform content adaptation",
      "Real-time trend identification"
    ],
    features: [
      "AI content generation",
      "Visual asset creation",
      "Smart scheduling",
      "Sentiment analysis",
      "Competitor monitoring",
      "Performance analytics"
    ],
    pricing: {
      starting: "$997/mo",
      includes: [
        "Unlimited posts",
        "10 social accounts",
        "AI content studio",
        "Engagement automation",
        "Monthly strategy calls"
      ]
    }
  },
  {
    id: "strategy-dominance",
    icon: Target,
    title: "Strategy Dominance",
    description: "Data-driven strategic planning powered by predictive AI models and competitive intelligence.",
    fullDescription: "Gain an unfair advantage with AI-powered strategic intelligence. Our Strategy Dominance service combines predictive modeling, competitive analysis, and market trend detection to give you clarity on where to invest your resources. Make confident decisions backed by data, not guesswork.",
    benefits: [
      "Predict market shifts before competitors",
      "Identify untapped revenue opportunities",
      "Optimize resource allocation",
      "Data-backed strategic decisions",
      "Continuous competitive monitoring"
    ],
    features: [
      "Predictive market modeling",
      "Competitor intelligence",
      "Scenario planning",
      "Risk assessment AI",
      "Strategic recommendations",
      "Executive dashboards"
    ],
    pricing: {
      starting: "$4,997/mo",
      includes: [
        "Full market analysis",
        "Quarterly strategy sessions",
        "Custom AI models",
        "Executive reports",
        "Dedicated strategist"
      ]
    }
  },
  {
    id: "market-intelligence",
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Real-time market analysis, trend detection, and actionable insights from AI-processed data streams.",
    fullDescription: "Stay ahead of the curve with real-time market intelligence powered by AI. We process millions of data points from news, social media, financial reports, and industry sources to deliver actionable insights. Know what's happening in your market before it becomes common knowledge.",
    benefits: [
      "Real-time market monitoring",
      "Early trend detection",
      "Competitor move alerts",
      "Customer sentiment tracking",
      "Industry benchmark reports"
    ],
    features: [
      "Multi-source data aggregation",
      "NLP-powered analysis",
      "Custom alert systems",
      "Trend forecasting",
      "Interactive dashboards",
      "API data access"
    ],
    pricing: {
      starting: "$2,497/mo",
      includes: [
        "Unlimited queries",
        "Custom data feeds",
        "Alert configurations",
        "Weekly insights",
        "Data exports"
      ]
    }
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Full-stack digital marketing with AI optimization for maximum ROI across all channels.",
    fullDescription: "Maximize every marketing dollar with AI-optimized campaigns across all digital channels. Our Digital Marketing service combines human creativity with machine precision to deliver campaigns that convert. From paid ads to email sequences, every touchpoint is continuously optimized for performance.",
    benefits: [
      "Lower customer acquisition costs",
      "Higher conversion rates",
      "Cross-channel attribution",
      "Real-time campaign optimization",
      "Scalable growth strategies"
    ],
    features: [
      "AI ad optimization",
      "Automated A/B testing",
      "Audience segmentation",
      "Creative generation",
      "Performance tracking",
      "Budget allocation AI"
    ],
    pricing: {
      starting: "$3,497/mo",
      includes: [
        "All channel management",
        "Creative production",
        "Landing page optimization",
        "Monthly reporting",
        "Strategy sessions"
      ]
    }
  },
  {
    id: "brand-web-generation",
    icon: Palette,
    title: "Brand & Web Generation",
    description: "AI-assisted brand identity creation and website generation that converts visitors into customers.",
    fullDescription: "Launch a stunning brand presence in weeks, not months. Our AI-assisted brand and web generation creates cohesive visual identities and high-converting websites. From logo concepts to full website builds, we combine AI efficiency with human creativity to deliver professional results at unprecedented speed.",
    benefits: [
      "Launch 5x faster than traditional agencies",
      "Consistent brand identity across all touchpoints",
      "Conversion-optimized web design",
      "Unlimited design iterations",
      "SEO-ready from day one"
    ],
    features: [
      "AI logo generation",
      "Brand style guides",
      "Website design & build",
      "Copy generation",
      "Asset library creation",
      "Responsive optimization"
    ],
    pricing: {
      starting: "$7,997",
      includes: [
        "Complete brand identity",
        "5-page website",
        "Mobile optimization",
        "SEO setup",
        "3 months support"
      ]
    }
  },
  {
    id: "startup-support",
    icon: Rocket,
    title: "Start-up Support",
    description: "Comprehensive support for startups including AI strategy, implementation, and growth acceleration.",
    fullDescription: "Give your startup an AI-powered edge from day one. Our Start-up Support program provides comprehensive guidance on implementing AI across your operations—from product development to go-to-market strategy. Get the expertise of a full AI team at a fraction of the cost.",
    benefits: [
      "AI-first growth strategy",
      "Faster time to market",
      "Reduced burn rate through automation",
      "Investor-ready AI narrative",
      "Scalable infrastructure from day one"
    ],
    features: [
      "AI readiness assessment",
      "Technology roadmapping",
      "MVP development support",
      "Growth hacking",
      "Investor pitch prep",
      "Ongoing mentorship"
    ],
    pricing: {
      starting: "$1,997/mo",
      includes: [
        "Weekly strategy calls",
        "AI implementation support",
        "Growth playbooks",
        "Investor introductions",
        "Community access"
      ]
    }
  }
];

export const getServiceById = (id: string): ServiceData | undefined => {
  return services.find(service => service.id === id);
};
