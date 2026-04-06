import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const categories = ["All", "Language Tips", "Cultural Stories", "Education", "Global Perspectives"];

const articles = [
  { title: "Why Multilingualism Is the Future of Communication", category: "Education", featured: true, excerpt: "In an increasingly connected world, the ability to speak multiple languages opens doors..." },
  { title: "5 Tips to Master French Pronunciation", category: "Language Tips", excerpt: "French pronunciation can be tricky, but with these simple techniques..." },
  { title: "The Beauty of Arabic Calligraphy", category: "Cultural Stories", excerpt: "Arabic calligraphy is one of the world's most beautiful art forms..." },
  { title: "How German Precision Shapes Language", category: "Language Tips", excerpt: "German is known for its compound words and precise grammar structures..." },
  { title: "Urdu Poetry: A Window to the Soul", category: "Cultural Stories", excerpt: "From Ghalib to Faiz, Urdu poetry captures the deepest human emotions..." },
  { title: "Education Access in Developing Nations", category: "Global Perspectives", excerpt: "Millions of children worldwide still lack access to quality education..." },
];

const Blog = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 bg-background text-center">
          <AnimatedText text="Blog & Articles" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Stories, insights, and perspectives from our global community.
          </motion.p>
        </section>

        <section className="py-8 bg-ivory">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                    active === cat
                      ? "bg-gold text-primary-foreground"
                      : "bg-background border border-border text-muted-foreground hover:border-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured */}
            {featured && (
              <ScrollReveal>
                <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm mb-8">
                  <div className="h-56 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-body">Featured Article</span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-gold font-medium uppercase">{featured.category}</span>
                    <h2 className="text-2xl font-display font-semibold text-charcoal mt-2">{featured.title}</h2>
                    <p className="text-muted-foreground font-body mt-2">{featured.excerpt}</p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-background rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-36 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm font-body">Coming Soon</span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-gold font-medium uppercase">{article.category}</span>
                      <h3 className="font-display font-semibold text-lg text-charcoal mt-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">{article.excerpt}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contribute */}
        <section className="py-20 bg-background text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Contribute Your Story</h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-6">
              We welcome writers, learners, and thinkers from all over the world to share their perspectives on language, culture, and education.
            </p>
            <a href="/contact" className="px-6 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors inline-block">
              Get In Touch →
            </a>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Blog;
