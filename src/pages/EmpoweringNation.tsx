import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, GraduationCap } from "lucide-react";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import empImg1 from "@/assets/empowering-nation-1.jpg";
import empImg2 from "@/assets/empowering-nation-2.jpg";

const steps = [
  { icon: Heart, title: "Donate", desc: "Your generous contribution fuels the mission." },
  { icon: Users, title: "We Identify Students", desc: "We find students who need support the most." },
  { icon: GraduationCap, title: "Education Unlocked", desc: "Students stay in school and build their future." },
];

const EmpoweringNation = () => (
  <PageTransition>
    <Navbar />
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-b from-accent-urdu/10 to-background overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/20"
            style={{ left: `${10 + i * 12}%`, bottom: "10%" }}
            animate={{ y: [0, -200, -400], opacity: [0, 1, 0] }}
            transition={{ duration: 6, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <div className="container mx-auto px-4 text-center relative z-10 px-4">
          <AnimatedText text="Empowering Nation" className="text-3xl sm:text-4xl md:text-7xl font-display font-bold text-charcoal leading-tight" as="h1" />
          <motion.p
            className="mt-6 text-xl text-muted-foreground font-body max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Because every child deserves the right to learn.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-6">Our Mission</h2>
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              Empowering Nation is a charitable initiative dedicated to supporting young students across Pakistan with their 
              school, college, and university fees. Through generous donations, we help break down financial barriers that 
              prevent talented young minds from accessing education. Because when one child learns, a whole community rises.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal text-center mb-12">Our Impact</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <motion.div
                className="rounded-lg overflow-hidden shadow-lg"
                whileInView={{ y: [30, 0] }}
                viewport={{ once: true }}
              >
                <img src={empImg1} alt="Distribution Drive" className="w-full h-80 object-cover" />
              </motion.div>
              <p className="mt-4 text-center font-accent text-muted-foreground">
                A distribution drive reaching families in need — packages of hope delivered with love and care in local communities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <motion.div
                className="rounded-lg overflow-hidden shadow-lg"
                whileInView={{ y: [30, 0] }}
                viewport={{ once: true }}
              >
                <img src={empImg2} alt="School Visit" className="w-full h-80 object-cover" />
              </motion.div>
              <p className="mt-4 text-center font-accent text-muted-foreground">
                Visiting schools to understand their needs — ensuring every classroom is a place of possibility and every student feels seen.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impact Gallery */}
      <div className="container mx-auto px-4 mb-20">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(import.meta.glob("../assets/gallery/*.webp", { eager: true, import: "default" })).slice(0, 12).map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div 
                  className="aspect-square rounded-lg overflow-hidden relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={src as string} alt="Initiative Activity" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/gallery" className="text-gold font-body font-medium hover:underline inline-flex items-center gap-1">
              View all {Object.keys(import.meta.glob("../assets/gallery/*.webp")).length} photos in project gallery →
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal text-center mb-12">How It Works</h2>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="flex flex-col items-center text-center max-w-xs">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4"
                    whileInView={{ scale: [0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: i * 0.2 }}
                  >
                    <step.icon className="text-gold" size={28} />
                  </motion.div>
                  <h3 className="font-display font-semibold text-lg text-charcoal">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block w-20 h-0.5 bg-gold/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-20 bg-gradient-to-r from-gold/20 to-accent-urdu/10">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">
              Help a Student Stay in School
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8">
              Every donation directly supports a student's educational journey. Together, we can unlock futures.
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-primary-foreground text-lg font-medium hover:bg-gold/90 transition-colors"
              >
                <Heart size={20} />
                Support Empowering Nation
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <Footer />
  </PageTransition>
);

export default EmpoweringNation;
