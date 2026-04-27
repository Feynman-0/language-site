import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogService, Blog } from "@/services/blogService";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageTransition from "@/components/shared/PageTransition";
import { Loader2, Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import DOMPurify from "dompurify";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await blogService.getBlogById(id);
        if (!data || data.status !== 'approved') {
          toast.error("Blog post not found");
          navigate("/blog");
          return;
        }
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog post");
        navigate("/blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory/30">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] w-full">
          {blog.image_url ? (
            <img 
              src={blog.image_url} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/30 to-accent-french/30 flex items-center justify-center">
              <span className="text-gold font-display font-bold text-6xl opacity-10 italic">Language Society</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
            <div className="container mx-auto">
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate("/blog")}
                className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-8 hover:gap-4 transition-all"
              >
                <ArrowLeft size={16} /> Back to Stories
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl"
              >
                <h1 className="text-4xl md:text-7xl font-display font-bold text-charcoal mb-8 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap gap-8 items-center text-sm font-bold text-gold uppercase tracking-widest bg-white/50 backdrop-blur-md w-fit p-4 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-xs">
                      {blog.author_name[0]}
                    </div>
                    <span>{blog.author_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <button className="flex items-center gap-2 hover:text-charcoal transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl shadow-gold/5 border border-border/50"
            >
              <div 
                className="prose prose-gold prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:text-charcoal prose-p:font-body prose-p:text-muted-foreground prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
              />
            </motion.div>

            {/* Author Footer */}
            <div className="mt-20 p-12 bg-charcoal rounded-3xl text-white flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-gold flex items-center justify-center text-3xl font-bold">
                {blog.author_name[0]}
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">Written by</p>
                <h3 className="text-3xl font-display font-bold mb-2">{blog.author_name}</h3>
                <p className="text-white/60 font-body">A valued contributor to the Language Society community, sharing insights and stories to inspire global learners.</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full border-gold text-gold hover:bg-gold hover:text-white"
                onClick={() => navigate("/submit-blog")}
              >
                Contribute Your Story
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default BlogPost;
