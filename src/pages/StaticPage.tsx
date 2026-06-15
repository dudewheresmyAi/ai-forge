import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NotFound from "./NotFound";
import { staticPages } from "@/content/staticPages";

export default function StaticPage() {
  const { slug = "" } = useParams();
  const page = staticPages[slug];

  if (!page) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{page.title} | AgenticForce</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={`https://agenticforce.lovable.app/${slug}`} />
        <meta property="og:title" content={`${page.title} | AgenticForce`} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={`https://agenticforce.lovable.app/${slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.title,
            description: page.description,
            url: `https://agenticforce.lovable.app/${slug}`,
            isPartOf: {
              "@type": "WebSite",
              name: "AgenticForce",
              url: "https://agenticforce.lovable.app",
            },
            about: page.category,
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: page.sections.map((s) => ({
                "@type": "Question",
                name: s.heading,
                acceptedAnswer: { "@type": "Answer", text: s.body },
              })),
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://agenticforce.lovable.app" },
              { "@type": "ListItem", position: 2, name: page.category },
              { "@type": "ListItem", position: 3, name: page.title, item: `https://agenticforce.lovable.app/${slug}` },
            ],
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="max-w-4xl mx-auto container-padding pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            {page.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            {page.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            {page.description}
          </p>

          <div className="space-y-10">
            {page.sections.map((section, i) => (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8 backdrop-blur"
              >
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
