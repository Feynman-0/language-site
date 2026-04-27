import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle, BookOpen, GraduationCap, Clock, Globe2 } from "lucide-react";
import AnimatedText from "@/components/shared/AnimatedText";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";

const languages = [
  { name: "French", icon: "🇫🇷" },
  { name: "English", icon: "🇬🇧" },
  { name: "German", icon: "🇩🇪" },
  { name: "Urdu", icon: "🇵🇰" },
  { name: "Arabic", icon: "🇸🇦" }
];

const levels = ["A1 - Beginner", "A2 - Elementary", "B1 - Intermediate", "B2 - Upper-Intermediate", "C1 - Advanced"];
const batches = ["Morning (09:00 - 11:00)", "Afternoon (14:00 - 16:00)", "Evening (18:00 - 20:00)", "Weekend Intensive"];

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const CourseRegistration = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    level: "",
    batch: "",
    comments: "",
    agreed: false,
  });

  const update = (field: string, value: string | boolean) => 
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("registrations").insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        language: form.language,
        level: form.level,
        batch: form.batch,
        comments: form.comments,
      }]);

      if (error) throw error;

      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0a1120', '#FFFFFF']
      });
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-3 px-1 font-body text-charcoal transition-all placeholder:text-muted-foreground/50";
  const selectClass = "w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-3 px-1 font-body text-charcoal transition-all appearance-none";

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <section className="py-20 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-english/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <span className="font-accent text-gold italic text-lg mb-2 block">Begin Your Journey</span>
                  <AnimatedText 
                    text="Course Registration" 
                    className="text-4xl md:text-6xl font-display font-bold text-charcoal" 
                    as="h1" 
                  />
                  <p className="mt-4 text-muted-foreground font-body max-w-xl mx-auto">
                    Fill out the form below to secure your spot in our upcoming language sessions. 
                    Our counselors will contact you within 24 hours.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Side: Info Cards */}
                <div className="lg:col-span-1 space-y-4">
                  <ScrollReveal delay={0.2}>
                    <div className="bg-ivory/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                        <Globe2 className="text-gold" size={20} />
                      </div>
                      <h3 className="font-display font-semibold text-charcoal mb-1">Global Standard</h3>
                      <p className="text-sm text-muted-foreground font-body">CEFR aligned curriculum recognized worldwide.</p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <div className="bg-ivory/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50">
                      <div className="w-10 h-10 rounded-full bg-accent-french/10 flex items-center justify-center mb-4">
                        <Clock className="text-accent-french" size={20} />
                      </div>
                      <h3 className="font-display font-semibold text-charcoal mb-1">Flexible Batches</h3>
                      <p className="text-sm text-muted-foreground font-body">Choose times that fit your professional schedule.</p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-2">
                  <div className="bg-background rounded-3xl border border-border shadow-2xl overflow-hidden">
                    <div className="h-2 bg-muted w-full">
                      <motion.div 
                        className="h-full bg-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: submitted ? "100%" : `${(step / 3) * 100}%` }}
                      />
                    </div>

                    <div className="p-8 md:p-12">
                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                          >
                            <div className="w-20 h-20 bg-accent-arabic/10 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckCircle className="text-accent-arabic" size={48} />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Application Received!</h2>
                            <p className="text-muted-foreground font-body max-w-sm mx-auto mb-8">
                              Thank you for choosing Language Society. We have sent a confirmation email to <strong>{form.email}</strong>.
                            </p>
                            <button
                              onClick={() => window.location.href = '/'}
                              className="px-8 py-3 rounded-full bg-charcoal text-white font-medium hover:bg-black transition-colors"
                            >
                              Return Home
                            </button>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-8">
                            {step === 1 && (
                              <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                              >
                                <div className="flex items-center gap-2 text-gold mb-2">
                                  <span className="text-xs font-bold uppercase tracking-widest">Step 01</span>
                                  <div className="h-px flex-1 bg-gold/20" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-charcoal">Personal Details</h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Full Name</label>
                                    <input 
                                      required
                                      placeholder="John Doe"
                                      className={inputClass}
                                      value={form.name}
                                      onChange={(e) => update("name", e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Email Address</label>
                                    <input 
                                      required
                                      type="email"
                                      placeholder="john@example.com"
                                      className={inputClass}
                                      value={form.email}
                                      onChange={(e) => update("email", e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number</label>
                                  <input 
                                    required
                                    type="tel"
                                    placeholder="+92 300 1234567"
                                    className={inputClass}
                                    value={form.phone}
                                    onChange={(e) => update("phone", e.target.value)}
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setStep(2)}
                                  className="w-full py-4 rounded-xl bg-gold text-primary-foreground font-bold hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                  Next Step
                                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                                </button>
                              </motion.div>
                            )}

                            {step === 2 && (
                              <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                              >
                                <div className="flex items-center gap-2 text-gold mb-2">
                                  <span className="text-xs font-bold uppercase tracking-widest">Step 02</span>
                                  <div className="h-px flex-1 bg-gold/20" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-charcoal">Course & Batch</h2>

                                <div className="space-y-2 group">
                                  <label className="text-xs font-bold text-muted-foreground uppercase">Target Language</label>
                                  <div className="relative">
                                    <select 
                                      required
                                      className={selectClass}
                                      value={form.language}
                                      onChange={(e) => update("language", e.target.value)}
                                    >
                                      <option value="">Choose a Language</option>
                                      {languages.map(l => <option key={l.name} value={l.name}>{l.icon} {l.name}</option>)}
                                    </select>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                      <BookOpen size={16} />
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Current Level</label>
                                    <div className="relative">
                                      <select 
                                        required
                                        className={selectClass}
                                        value={form.level}
                                        onChange={(e) => update("level", e.target.value)}
                                      >
                                        <option value="">Select Level</option>
                                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                      </select>
                                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                        <GraduationCap size={16} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">Batch Preference</label>
                                    <div className="relative">
                                      <select 
                                        required
                                        className={selectClass}
                                        value={form.batch}
                                        onChange={(e) => update("batch", e.target.value)}
                                      >
                                        <option value="">Select Time</option>
                                        {batches.map(b => <option key={b} value={b}>{b}</option>)}
                                      </select>
                                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                        <Clock size={16} />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-4">
                                  <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-4 rounded-xl border border-border text-charcoal font-bold hover:bg-ivory transition-all"
                                  >
                                    Back
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="flex-1 py-4 rounded-xl bg-gold text-primary-foreground font-bold hover:shadow-lg transition-all"
                                  >
                                    Almost Done
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {step === 3 && (
                              <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                              >
                                <div className="flex items-center gap-2 text-gold mb-2">
                                  <span className="text-xs font-bold uppercase tracking-widest">Final Step</span>
                                  <div className="h-px flex-1 bg-gold/20" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-charcoal">Final Thoughts</h2>

                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-muted-foreground uppercase">Any special requirements?</label>
                                  <textarea 
                                    placeholder="Tell us about your learning goals..."
                                    className="w-full bg-transparent border-2 border-border focus:border-gold rounded-xl outline-none py-3 px-4 font-body text-charcoal transition-all h-32 resize-none"
                                    value={form.comments}
                                    onChange={(e) => update("comments", e.target.value)}
                                  />
                                </div>

                                <div className="p-4 bg-ivory rounded-xl border border-border/50">
                                  <label className="flex items-start gap-3 cursor-pointer group">
                                    <input 
                                      type="checkbox" 
                                      className="mt-1 accent-gold w-4 h-4"
                                      checked={form.agreed}
                                      onChange={(e) => update("agreed", e.target.checked)}
                                    />
                                    <span className="text-sm font-body text-muted-foreground group-hover:text-charcoal transition-colors">
                                      I confirm that the information provided is accurate and I agree to the Language Society terms of enrollment.
                                    </span>
                                  </label>
                                </div>

                                <div className="flex gap-4">
                                  <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="flex-1 py-4 rounded-xl border border-border text-charcoal font-bold hover:bg-ivory transition-all"
                                  >
                                    Back
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={!form.agreed || isSubmitting}
                                    className="flex-2 py-4 px-8 rounded-xl bg-gold text-primary-foreground font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                  >
                                    {isSubmitting ? (
                                      <motion.div
                                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                      />
                                    ) : (
                                      "Submit Application"
                                    )}
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </form>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CourseRegistration;
