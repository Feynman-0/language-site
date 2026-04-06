import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import GlobeSvg from "./GlobeSvg";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/courses", label: "Courses" },
  { path: "/events", label: "Events" },
  { path: "/blog", label: "Blog" },
  { path: "/gallery", label: "Gallery" },
  { path: "/empowering-nation", label: "Empowering Nation" },
  { path: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-background/80 backdrop-blur-xl shadow-sm"
            : "py-4 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`animate-globe text-gold transition-all ${scrolled ? "w-8 h-8" : "w-10 h-10"}`}>
              <GlobeSvg />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-display font-bold text-charcoal transition-all ${scrolled ? "text-base" : "text-lg"}`}>
                Language Society
              </span>
              <span className="font-accent text-muted-foreground text-xs">
                & Cultural Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm font-body text-charcoal/80 hover:text-charcoal transition-colors group"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gold"
                  initial={false}
                  animate={{
                    width: location.pathname === link.path ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold/50 w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100066383790426"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 hover:text-accent-french transition-colors"
            >
              <FaFacebook size={18} />
            </a>
            <Link
              to="/register"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-gold text-primary-foreground text-sm font-medium hover:bg-gold/90 transition-colors animate-shimmer bg-gradient-to-r from-gold via-gold/80 to-gold"
            >
              Enroll Now
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-charcoal"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4">
              <span className="font-display font-bold text-lg text-charcoal">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-display ${
                      location.pathname === link.path ? "text-gold" : "text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  to="/register"
                  className="mt-4 inline-flex px-8 py-3 rounded-full bg-gold text-primary-foreground font-medium"
                >
                  Enroll Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
