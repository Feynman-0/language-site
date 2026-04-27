import { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { Mail, MapPin, Send } from "lucide-react";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const FloatingInput = ({ label, type = "text", name }: { label: string; type?: string; name: string }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label
        className="absolute left-3 text-muted-foreground font-body pointer-events-none origin-left"
        animate={{
          y: active ? -24 : 0,
          scale: active ? 0.85 : 1,
          color: active ? "hsl(43, 52%, 54%)" : undefined,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      {type === "textarea" ? (
        <textarea
          name={name}
          className="w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-2 px-3 font-body text-charcoal resize-none h-32 transition-colors"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          className="w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-2 px-3 font-body text-charcoal transition-colors"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      )}
    </div>
  );
};

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await supabase.from("contacts").insert([data]);
      if (error) throw error;
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 bg-background text-center">
          <AnimatedText text="Contact Us" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
        </section>

        <section className="py-16 bg-ivory relative overflow-hidden">
          {/* Decorative map */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 800 400" className="w-full max-w-4xl" fill="currentColor">
              <ellipse cx="400" cy="200" rx="350" ry="150" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground font-body">
                      <Mail className="text-gold" size={20} />
                      <span>info@languagesociety.org</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground font-body">
                      <MapPin className="text-gold" size={20} />
                      <span>Pakistan</span>
                    </div>
                    <a
                      href="https://www.facebook.com/profile.php?id=100066383790426"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-accent-french font-body transition-colors"
                    >
                      <FaFacebook className="text-accent-french" size={20} />
                      <span>Follow us on Facebook</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-8 bg-background p-8 rounded-lg border border-border shadow-sm">
                  <FloatingInput label="Your Name" name="name" />
                  <FloatingInput label="Email Address" type="email" name="email" />
                  <FloatingInput label="Subject" name="subject" />
                  <FloatingInput label="Message" type="textarea" name="message" />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    {sending ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Contact;
