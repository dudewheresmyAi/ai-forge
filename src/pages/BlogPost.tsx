import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NotFound from "./NotFound";
import { getPostBySlug, blogPosts } from "@/content/blogPosts";

const SITE = "https://agenticforce.lovable.app";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const url = `${SITE}/blog/${post.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "AgenticForce",
      url: SITE,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | AgenticForce Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <Navbar />
      <main className="max-w-3xl mx-auto container-padding pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
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
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-8 border-b border-border/50">
            <span>{post.author}</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <article className="space-y-10">
            {post.body.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-muted-foreground leading-relaxed mb-4"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>

          {related.length > 0 && (
            <aside className="mt-20 pt-10 border-t border-border/50">
              <h3 className="text-sm uppercase tracking-widest text-primary font-semibold mb-6">
                Keep reading
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group block rounded-xl border border-border/50 bg-card/40 p-5 hover:border-primary/50 transition-all"
                  >
                    <h4 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {r.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
