import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import AnimatedText from "@/components/shared/AnimatedText";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CheckCircle } from "lucide-react";

const languages = ["French", "English", "German", "Urdu", "Arabic"];
const levels = ["A1 - Beginner", "A2 - Elementary", "B1 - Intermediate", "B2 - Upper-Intermediate"];
const hearAbout = ["Social Media", "Friend/Family", "Google Search", "Event", "Other"];

const Register = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "",
    language: "", level: "", hearAbout: "",
    agreed: false,
  });

  const update = (field: string, value: string | boolean) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  const inputClass = "w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-2 px-1 font-body text-charcoal transition-colors";
  const selectClass = "w-full bg-transparent border-b-2 border-border focus:border-gold outline-none py-2 px-1 font-body text-charcoal transition-colors appearance-none";

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-xl">
            <AnimatedText text="Enroll Now" className="text-4xl md:text-5xl font-display font-bold text-charcoal text-center" as="h1" />

            {!submitted && (
              <>
                {/* Progress */}
                <div className="mt-8 flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-gold"
                        animate={{ width: step >= s ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground font-body mt-2">
                  Step {step} of 3
                </p>
              </>
            )}

            <div className="mt-8 bg-ivory rounded-lg border border-border p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="text-accent-arabic mx-auto mb-4" size={64} />
                    <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Enrollment Complete!</h2>
                    <p className="text-muted-foreground font-body">
                      Thank you, {form.name}! We'll be in touch soon about your {form.language} ({form.level}) program.
                    </p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-semibold text-xl text-charcoal">Personal Information</h3>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Full Name</label>
                      <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Email</label>
                      <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Phone Number</label>
                      <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Country</label>
                      <input className={inputClass} value={form.country} onChange={(e) => update("country", e.target.value)} />
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors"
                    >
                      Next →
                    </button>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="step2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-semibold text-xl text-charcoal">Course Selection</h3>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Language</label>
                      <select className={selectClass} value={form.language} onChange={(e) => update("language", e.target.value)}>
                        <option value="">Select language...</option>
                        {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">Level</label>
                      <select className={selectClass} value={form.level} onChange={(e) => update("level", e.target.value)}>
                        <option value="">Select level...</option>
                        {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground font-body">How did you hear about us?</label>
                      <select className={selectClass} value={form.hearAbout} onChange={(e) => update("hearAbout", e.target.value)}>
                        <option value="">Select...</option>
                        {hearAbout.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-full border-2 border-border text-charcoal font-medium hover:border-gold transition-colors">
                        ← Back
                      </button>
                      <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors">
                        Next →
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step3"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-semibold text-xl text-charcoal">Confirm Your Enrollment</h3>
                    <div className="space-y-3 bg-background rounded-lg p-4 border border-border">
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground">Name</span>
                        <span className="text-charcoal font-medium">{form.name || "—"}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground">Email</span>
                        <span className="text-charcoal font-medium">{form.email || "—"}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground">Language</span>
                        <span className="text-charcoal font-medium">{form.language || "—"}</span>
                      </div>
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground">Level</span>
                        <span className="text-charcoal font-medium">{form.level || "—"}</span>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-sm font-body text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreed}
                        onChange={(e) => update("agreed", e.target.checked)}
                        className="accent-gold"
                      />
                      I agree to the terms and conditions
                    </label>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-full border-2 border-border text-charcoal font-medium hover:border-gold transition-colors">
                        ← Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!form.agreed}
                        className="flex-1 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
                      >
                        Submit Enrollment
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Register;
