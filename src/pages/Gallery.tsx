import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";
import ScrollReveal from "@/components/shared/ScrollReveal";
import PageTransition from "@/components/shared/PageTransition";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import empImg1 from "@/assets/empowering-nation-1.jpg";
import empImg2 from "@/assets/empowering-nation-2.jpg";

const tabs = ["All", "Empowering Nation", "Events", "Classes"];

const galleryImages = import.meta.glob("../assets/gallery/*.webp", { eager: true, import: 'default' });
const sortedPaths = Object.keys(galleryImages).sort((a, b) => {
  const numA = parseInt(a.split('-')[1]);
  const numB = parseInt(b.split('-')[1]);
  return numA - numB;
});

const additionalItems = sortedPaths.map((path, i) => {
  const src = galleryImages[path];
  const fileNumber = i + 1; // 1-indexed for comparison with user's gallery-X
  
  let tab = "Empowering Nation";
  let caption = "Community Initiative — Empowering Nation";
  
  // Specific categorization based on user feedback
  if (fileNumber >= 14 && fileNumber <= 22) {
    tab = "Classes";
    caption = "Learning Session — Language Classes";
  } else if (fileNumber >= 23 && fileNumber <= 35) {
    tab = "Events";
    caption = "Society Event — Cultural Gatherings";
  } 
  
  // Especially ensure gallery-41 and gallery-6 are not in classes
  if (fileNumber === 41 || fileNumber === 6) {
    tab = "Empowering Nation";
    caption = "Distribution Drive — Community Support";
  }
  
  return {
    src: src as string,
    caption,
    tab
  };
});

const galleryItems = [
  { src: empImg1, caption: "Distribution Drive — Empowering Nation Initiative", tab: "Empowering Nation" },
  { src: empImg2, caption: "Education Access Visit — School Support Program", tab: "Empowering Nation" },
  ...additionalItems
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeTab === "All" ? galleryItems : galleryItems.filter((g) => g.tab === activeTab);

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24">
        <section className="py-20 bg-background text-center">
          <AnimatedText text="Gallery" className="text-4xl md:text-6xl font-display font-bold text-charcoal" as="h1" />
        </section>

        <section className="py-8 bg-ivory min-h-[60vh]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                    activeTab === tab
                      ? "bg-gold text-primary-foreground"
                      : "bg-background border border-border text-muted-foreground hover:border-gold"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    className="break-inside-avoid rounded-lg overflow-hidden relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightbox(item.src)}
                  >
                    <img src={item.src} alt={item.caption} className="w-full object-cover" />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors flex items-end">
                      <p className="text-primary-foreground text-sm font-body p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.caption}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}

            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] bg-charcoal/90 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt=""
              className="max-w-full max-h-[90vh] rounded-lg object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Gallery;
