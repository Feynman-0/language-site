import { motion } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Calendar, Clock, Tag } from "lucide-react";

const pastEvents = [
  { title: "Language Exchange Workshop", date: "Nov 2024", category: "Workshop", desc: "An interactive session connecting French and Arabic learners." },
  { title: "Cultural Sharing Session", date: "Oct 2024", category: "Cultural", desc: "Stories and traditions shared by members across 5 countries." },
  { title: "Multilingual Poetry Night", date: "Sep 2024", category: "Cultural", desc: "An evening of poetry in Urdu, French, and English." },
];

const upcomingEvents = [
  { title: "German Language Bootcamp", category: "Course" },
  { title: "Global Cultures Festival", category: "Festival" },
  { title: "Education Fundraiser", category: "Charity" },
];

const Events = () => (
  <PageTransition>
    <Navbar />
    <main className="pt-24">
      <section className="py-20 bg-background text-center">
        <AnimatedText text="Events & Workshops" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
        <motion.p
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Bringing cultures together through shared experiences.
        </motion.p>
      </section>

      {/* Upcoming */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Upcoming Events</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="bg-background rounded-lg p-6 border-2 border-gold/30 animate-pulse-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={14} className="text-gold" />
                    <span className="text-xs font-body text-gold font-medium uppercase">{event.category}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-charcoal mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground font-body italic">Details coming soon</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Past Events</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/30" />
            {pastEvents.map((event, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`relative flex flex-col md:flex-row items-start mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1.5 mt-2" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-ivory rounded-lg p-6 border border-border shadow-sm">
                      <div className="flex items-center gap-2 mb-2 justify-start">
                        <Calendar size={14} className="text-gold" />
                        <span className="text-xs text-muted-foreground font-body">{event.date}</span>
                        <Clock size={14} className="text-muted-foreground ml-2" />
                        <span className="text-xs text-gold font-body uppercase">{event.category}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-charcoal">{event.title}</h3>
                      <p className="text-sm text-muted-foreground font-body mt-1">{event.desc}</p>
                    </div>
                  </div>
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

export default Events;
