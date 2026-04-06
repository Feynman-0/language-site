import { motion } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import GlobeSvg from "@/components/shared/GlobeSvg";
import founderImg from "@/assets/founder.jpg";
import { Heart, Globe, BookOpen } from "lucide-react";

const About = () => (
  <PageTransition>
    <Navbar />
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-background overflow-hidden">
        <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[180px] md:text-[250px] font-display font-bold text-charcoal/5 select-none pointer-events-none leading-none">
          About
        </span>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedText text="About Us" className="text-5xl md:text-7xl font-display font-bold text-charcoal" as="h1" />
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Celebrating diversity, sharing knowledge, building connections beyond borders.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="bg-background rounded-lg p-8 border border-border shadow-sm">
              <motion.div
                className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Heart className="text-gold" size={24} />
              </motion.div>
              <h3 className="text-2xl font-display font-semibold text-charcoal mb-4">Our Mission</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                To create a community where diversity is celebrated, knowledge is shared, and connections are built beyond borders.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="bg-background rounded-lg p-8 border border-border shadow-sm">
              <motion.div
                className="w-12 h-12 rounded-full bg-accent-arabic/10 flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <Globe className="text-accent-arabic" size={24} />
              </motion.div>
              <h3 className="text-2xl font-display font-semibold text-charcoal mb-4">Our Vision</h3>
              <ul className="space-y-3 text-muted-foreground font-body">
                {[
                  "Every individual has access to education",
                  "Every culture is respected and understood",
                  "Every voice has the opportunity to be heard",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    <BookOpen className="text-accent-arabic mt-1 flex-shrink-0" size={16} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border-4 border-gold/20 shadow-xl max-w-sm mx-auto">
                  <img src={founderImg} alt="Iqra Siraj - Founder" className="w-full aspect-[3/4] object-cover" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-4xl font-display font-bold text-charcoal mb-2">Iqra Siraj</h2>
                <p className="font-accent text-lg text-muted-foreground mb-6">
                  Founder & Director — Language Society and Cultural Hub & Empowering Nation
                </p>
                <div className="relative pl-6 border-l-2 border-gold">
                  <span className="absolute -left-3 -top-2 text-5xl text-gold/30 font-display">"</span>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    With love and respect, I welcome you to the Language Society and Cultural Hub. This platform was born from 
                    a deep passion for languages, cultures, and the belief that education has the power to transform lives.
                  </p>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    Our community brings together writers, learners, and explorers from all over the world. Here, you'll find 
                    language programs designed with care, cultural exchange opportunities, and a space where every voice matters.
                  </p>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    Through Empowering Nation, we extend our mission beyond language — supporting young students with their 
                    educational journey, because every child deserves the right to learn.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cultural Hub */}
      <section className="py-20 bg-ivory relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 text-charcoal/5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <GlobeSvg />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6 text-center">
              A Space for the World
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed text-center text-lg">
              The Cultural Hub is more than a platform — it's a home for curious minds. Writers share their perspectives, 
              learners discover new languages, and explorers dive into cultures they've never known. From poetry in Urdu 
              to conversations in French, this is where the world comes together to learn, grow, and inspire.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer />
  </PageTransition>
);

export default About;
