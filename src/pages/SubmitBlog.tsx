import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { blogService } from "@/services/blogService";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedText from "@/components/shared/AnimatedText";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import RichTextEditor from "@/components/shared/RichTextEditor";

const formSchema = z.object({
  author_name: z.string().min(2, "Name is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  image_url: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const SubmitBlog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (content.replace(/<[^>]*>/g, '').length < 50) {
      toast.error("Content must be at least 50 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await blogService.createBlog({
        title: data.title,
        author_name: data.author_name,
        content: content,
        image_url: data.image_url || undefined,
        image_file: imageFile || undefined,
        status: 'pending',
      });
      toast.success("Blog submitted successfully! It will be visible after admin approval.");
      reset();
      setImageFile(null);
      setContent("");
    } catch (error) {
      toast.error("Failed to submit blog. Please check your connection and try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory/20">
        <section className="py-20 container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-gold/5 border border-border">
            <AnimatedText 
              text="Submit Your Story" 
              className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-4" 
              as="h1" 
            />
            <p className="text-muted-foreground font-body mb-10 text-lg">
              Share your insights with our global community. Use the editor below to format your story beautifully.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author_name" className="text-xs font-bold uppercase tracking-widest text-gold">Your Name *</Label>
                  <Input
                    id="author_name"
                    placeholder="Enter your full name"
                    {...register("author_name")}
                    className={errors.author_name ? "border-red-500 rounded-xl" : "rounded-xl border-border/60"}
                  />
                  {errors.author_name && <p className="text-xs text-red-500">{errors.author_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-gold">Blog Title *</Label>
                  <Input
                    id="title"
                    placeholder="A catchy title for your post"
                    {...register("title")}
                    className={errors.title ? "border-red-500 rounded-xl" : "rounded-xl border-border/60"}
                  />
                  {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image_file" className="text-xs font-bold uppercase tracking-widest text-gold">Featured Image</Label>
                  <Input
                    id="image_file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="cursor-pointer rounded-xl border-border/60"
                  />
                  <p className="text-[10px] text-muted-foreground">This image will appear on the main blog feed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-xs font-bold uppercase tracking-widest text-gold">Or Image URL</Label>
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    {...register("image_url")}
                    className={errors.image_url ? "border-red-500 rounded-xl" : "rounded-xl border-border/60"}
                  />
                  {errors.image_url && <p className="text-xs text-red-500">{errors.image_url.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-gold">Story Content *</Label>
                <RichTextEditor 
                  content={content} 
                  onChange={setContent} 
                  placeholder="Tell your story... You can add headings, quotes, and even images within your text."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-charcoal hover:bg-gold text-white py-8 rounded-2xl font-bold transition-all shadow-xl hover:shadow-gold/20 flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit for Review <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default SubmitBlog;
