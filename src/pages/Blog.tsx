import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { blogService, Blog as BlogType } from "@/services/blogService";
import { Loader2, Plus, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState<BlogType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await blogService.getApprovedBlogs();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 bg-background text-center">
          <AnimatedText text="Blog & Stories" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Insights and perspectives from our global community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <Link 
              to="/submit-blog" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-all shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> Share Your Story
            </Link>
          </motion.div>
        </section>

        <section className="py-8 bg-ivory/30 min-h-[400px]">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
                <p className="text-muted-foreground font-body">Loading stories...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-body">No stories found. Be the first to contribute!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                  <ScrollReveal key={article.id} delay={i * 0.1}>
                    <Link to={`/blog/${article.id}`} className="group block h-full">
                      <div className="bg-white rounded-none border border-border overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        {/* Squared Image Wrapper */}
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          {article.image_url ? (
                            <img 
                              src={article.image_url} 
                              alt={article.title} 
                              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gold/5 to-accent-french/5 flex items-center justify-center">
                              <span className="text-gold/20 font-display font-bold text-xl italic tracking-widest">SOCIETY</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-gold uppercase tracking-widest border border-gold/20">
                              Perspective
                            </span>
                          </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                          <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            <span>By {article.author_name}</span>
                          </div>
                          
                          <h3 className="font-display font-bold text-2xl text-charcoal mb-4 line-clamp-2 leading-tight group-hover:text-gold transition-colors duration-300">
                            {article.title}
                          </h3>
                          
                          <p className="text-muted-foreground font-body text-sm line-clamp-3 mb-8 leading-relaxed">
                            {article.content}
                          </p>
                          
                          <div className="mt-auto flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest border-t border-border pt-6 group-hover:gap-4 transition-all duration-300">
                            Read Full Story <span>→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contribute */}
        <section className="py-20 bg-background text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Contribute Your Story</h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
              We welcome writers, learners, and thinkers from all over the world to share their perspectives on language and culture.
            </p>
            <Link to="/submit-blog" className="px-8 py-4 rounded-full bg-gold text-primary-foreground font-bold hover:bg-gold/90 transition-all shadow-md hover:shadow-lg inline-block">
              Get Started Today
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Blog;
