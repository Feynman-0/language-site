import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ChevronDown } from "lucide-react";

const languages = [
  { name: "French", flag: "🇫🇷", color: "accent-french", bgColor: "bg-accent-french/10", borderColor: "border-accent-french", tagline: "The language of diplomacy, art, and international culture" },
  { name: "English", flag: "🇬🇧", color: "accent-english", bgColor: "bg-accent-english/10", borderColor: "border-accent-english", tagline: "The global lingua franca for business and beyond" },
  { name: "German", flag: "🇩🇪", color: "accent-german", bgColor: "bg-accent-german/10", borderColor: "border-accent-german", tagline: "The language of innovation, philosophy, and precision" },
  { name: "Urdu", flag: "🇵🇰", color: "accent-urdu", bgColor: "bg-accent-urdu/10", borderColor: "border-accent-urdu", tagline: "The language of poetry, grace, and deep cultural roots" },
  { name: "Arabic", flag: "🇸🇦", color: "accent-arabic", bgColor: "bg-accent-arabic/10", borderColor: "border-accent-arabic", tagline: "The language of heritage, wisdom, and spiritual depth" },
];

const levels = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate"];

const Courses = () => {
  const [openLang, setOpenLang] = useState<string | null>(null);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <AnimatedText text="Our Language Programs" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
            <motion.div
              className="flex justify-center gap-3 mt-6 text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {languages.map((l) => <span key={l.name}>{l.flag}</span>)}
            </motion.div>
            <motion.p
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              All programs are online, twice a week, interactive, with personal guidance and focus on practical communication.
            </motion.p>
          </div>
        </section>

        <section className="py-12 bg-ivory">
          <div className="container mx-auto px-4 space-y-4">
            {languages.map((lang, i) => (
              <ScrollReveal key={lang.name} delay={i * 0.1}>
                <div className={`rounded-lg border-2 ${openLang === lang.name ? lang.borderColor : "border-border"} overflow-hidden transition-colors`}>
                  <button
                    onClick={() => setOpenLang(openLang === lang.name ? null : lang.name)}
                    className={`w-full p-6 flex items-center justify-between ${lang.bgColor} hover:bg-opacity-20 transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{lang.flag}</span>
                      <div className="text-left">
                        <h3 className={`text-2xl font-display font-semibold text-${lang.color}`}>{lang.name}</h3>
                        <p className="text-sm text-muted-foreground font-body">{lang.tagline}</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: openLang === lang.name ? 180 : 0 }}>
                      <ChevronDown className="text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openLang === lang.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-background">
                          <p className="text-sm text-muted-foreground font-body mb-4">Available Levels:</p>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {levels.map((level, j) => (
                              <motion.span
                                key={level}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${lang.bgColor} text-${lang.color} border ${lang.borderColor}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.1 }}
                              >
                                {level}
                              </motion.span>
                            ))}
                          </div>
                          <Link
                            to="/register"
                            className={`inline-flex px-6 py-2 rounded-full bg-${lang.color} text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity`}
                          >
                            Enroll in {lang.name} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-20 bg-background text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6">
              Ready to start your language journey?
            </h2>
            <Link to="/register" className="inline-flex px-8 py-3 rounded-full bg-gold text-primary-foreground font-medium animate-shimmer bg-gradient-to-r from-gold via-gold/80 to-gold bg-[length:200%_auto] hover:bg-gold/90 transition-colors">
              Register Now →
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Courses;
