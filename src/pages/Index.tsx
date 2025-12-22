import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Services } from "@/components/sections/Services";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AgenticForce",
    description: "AI-first platform for autonomous workflows, marketing automation, and revenue optimization",
    url: "https://agenticforce.com",
    logo: "https://agenticforce.com/logo.png",
    sameAs: [
      "https://twitter.com/agenticforce",
      "https://linkedin.com/company/agenticforce",
      "https://github.com/agenticforce"
    ],
    offers: {
      "@type": "Offer",
      name: "AgenticForce Platform",
      description: "Deploy self-optimizing AI agents for sales and marketing automation"
    }
  };

  return (
    <>
      <Helmet>
        <title>AgenticForce | AI-Forged Autonomous Workflows for Revenue Growth</title>
        <meta 
          name="description" 
          content="Deploy self-optimizing AI agents that learn, adapt, and scale every stage of your sales and marketing stack. Reduce CAC by 37% and boost pipeline velocity by 62%." 
        />
        <meta name="keywords" content="agentic AI, autonomous workflows, marketing automation, AI agents, revenue optimization, sales automation" />
        <meta property="og:title" content="AgenticForce | AI-Forged Autonomous Workflows" />
        <meta property="og:description" content="Deploy self-optimizing AI agents that learn, adapt, and scale every stage of your sales and marketing stack." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AgenticForce | AI-Forged Autonomous Workflows" />
        <meta name="twitter:description" content="Deploy self-optimizing AI agents for revenue growth." />
        <link rel="canonical" href="https://agenticforce.com" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Features />
          <CTA />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
