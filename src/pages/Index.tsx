import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import CounterAnimation from "@/components/shared/CounterAnimation";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import empoweringImg from "@/assets/empowering-nation-1.jpg";

const floatingGlyphs = [
  { char: "文", delay: 0, x: "10%", y: "20%" },
  { char: "अ", delay: 1, x: "80%", y: "15%" },
  { char: "ع", delay: 2, x: "70%", y: "70%" },
  { char: "Ω", delay: 0.5, x: "15%", y: "75%" },
  { char: "É", delay: 1.5, x: "85%", y: "45%" },
];

const flagEmojis = ["🇫🇷", "🇬🇧", "🇩🇪", "🇵🇰", "🇸🇦"];

const languages = [
  { name: "French", flag: "🇫🇷", color: "accent-french", tagline: "The language of diplomacy and art" },
  { name: "English", flag: "🇬🇧", color: "accent-english", tagline: "The global lingua franca" },
  { name: "German", flag: "🇩🇪", color: "accent-german", tagline: "The language of innovation" },
  { name: "Urdu", flag: "🇵🇰", color: "accent-urdu", tagline: "The language of poetry and grace" },
  { name: "Arabic", flag: "🇸🇦", color: "accent-arabic", tagline: "The language of heritage and wisdom" },
];

const stats = [
  { value: 5, label: "Languages", suffix: "" },
  { value: 4, label: "Levels Each", suffix: "" },
  { value: 100, label: "Online Classes", suffix: "%" },
  { value: 20, label: "Countries", suffix: "+" },
];

const Home = () => (
  <PageTransition>
    <Navbar />
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Floating glyphs */}
        {floatingGlyphs.map((g, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl md:text-6xl text-charcoal/10 font-display select-none pointer-events-none"
            style={{ left: g.x, top: g.y }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {g.char}
          </motion.span>
        ))}

        {/* Orbiting flags */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {flagEmojis.map((flag, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-orbit"
              style={{
                animationDelay: `${i * -4}s`,
                animationDuration: "20s",
              }}
            >
              {flag}
            </span>
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <AnimatedText text="Learn Languages." className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-charcoal mb-2" as="h1" />
          <AnimatedText text="Explore Cultures." className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gold mb-2" as="h1" delay={0.5} />
          <AnimatedText text="Empower Lives." className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-charcoal" as="h1" delay={1} />

          <motion.p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            A global community where language meets culture and education changes lives.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, type: "spring" }}
          >
            <Link to="/courses" className="px-8 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors">
              Explore Courses
            </Link>
            <Link to="/about" className="px-8 py-3 rounded-full border-2 border-charcoal/20 text-charcoal font-medium hover:border-gold hover:text-gold transition-colors">
              Our Mission →
            </Link>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-charcoal/30" size={32} />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 bg-background rounded-lg border-t-4 border-gold shadow-sm">
                  <div className="text-4xl font-display font-bold text-charcoal">
                    <CounterAnimation target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGE PROGRAMS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal text-center mb-12">
              Our Language Programs
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {languages.map((lang, i) => (
              <ScrollReveal key={lang.name} delay={i * 0.1}>
                <motion.div
                  className="relative p-6 rounded-lg bg-ivory border border-border hover:shadow-lg transition-all group cursor-pointer overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`absolute left-0 top-0 w-1 h-full bg-${lang.color}`}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-3xl mb-3 block">{lang.flag}</span>
                  <h3 className={`font-display font-semibold text-lg text-${lang.color}`}>{lang.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-body flex-grow">{lang.tagline}</p>
                  <Link to="/courses" className={`mt-3 inline-block text-sm text-${lang.color} font-medium hover:underline`}>
                    View Program →
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6">
                More Than a Language School
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Language Society and Cultural Hub is where writers, learners, and explorers from all over the world come together. 
                We believe that learning a language is not just about words — it's about understanding people, cultures, and the world.
              </p>
              <Link to="/about" className="text-gold font-medium hover:underline">
                Meet Our Founder →
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <blockquote className="text-2xl md:text-3xl font-accent text-charcoal/80 leading-relaxed border-l-4 border-gold pl-6">
                "Language is more than words — it is a bridge between hearts."
              </blockquote>
            </ScrollReveal>
          </div>
          <motion.div
            className="mt-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </section>

      {/* EMPOWERING NATION TEASER */}
      <section className="py-20 bg-accent-urdu/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">
                Education Changes Everything
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Through Empowering Nation, we support young students with school, college, and university fees — 
                because every child deserves the right to learn.
              </p>
              <Link to="/empowering-nation" className="px-6 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:bg-gold/90 transition-colors inline-block">
                Learn About Empowering Nation
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <motion.div
                className="rounded-lg overflow-hidden shadow-lg"
                whileInView={{ y: [20, 0] }}
                viewport={{ once: true }}
              >
                <img src={empoweringImg} alt="Empowering Nation distribution drive" className="w-full h-80 object-cover" />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal text-center mb-12">
              Stories & Insights
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {["The Art of Learning French", "Understanding Arabic Calligraphy", "Why Multilingualism Matters"].map((title, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-ivory rounded-lg p-6 border border-border hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-40 bg-muted rounded-md mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-body">Coming Soon</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 font-body flex-grow">Exploring language and culture through stories that connect us all.</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </PageTransition>
);

export default Home;
