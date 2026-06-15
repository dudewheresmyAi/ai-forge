import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts } from "@/content/blogPosts";

const SITE = "https://agenticforce.lovable.app";

export default function BlogIndex() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AgenticForce Blog",
    url: `${SITE}/blog`,
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog — Essays on autonomous revenue | AgenticForce</title>
        <meta
          name="description"
          content="Essays, playbooks, and field notes from the autonomous-revenue frontier. New writing from the AgenticForce team."
        />
        <link rel="canonical" href={`${SITE}/blog`} />
        <meta property="og:title" content="AgenticForce Blog" />
        <meta property="og:url" content={`${SITE}/blog`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <Navbar />
      <main className="max-w-5xl mx-auto container-padding pt-32 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          Company
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Essays, playbooks, and field notes from the autonomous-revenue frontier.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8 backdrop-blur hover:border-primary/50 hover:bg-card/60 transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span>· {post.author}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
