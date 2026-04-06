import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import GlobeSvg from "./GlobeSvg";
import ScrollReveal from "./ScrollReveal";

const Footer = () => (
  <footer className="relative bg-charcoal text-cream pt-16 pb-8">
    {/* Animated gradient top border */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-french via-gold to-accent-arabic" />

    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 text-gold">
                <GlobeSvg />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-bold text-base">Language Society</span>
                <span className="font-accent text-cream/60 text-xs">& Cultural Hub</span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed">
              A global community where language meets culture and education changes lives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { path: "/about", label: "About Us" },
                { path: "/courses", label: "Courses" },
                { path: "/events", label: "Events" },
                { path: "/blog", label: "Blog" },
                { path: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-cream/60 hover:text-gold text-sm transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Programs */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Language Programs</h4>
            <div className="flex flex-col gap-2">
              {["French", "English", "German", "Urdu", "Arabic"].map((lang) => (
                <Link key={lang} to="/courses" className="text-cream/60 hover:text-gold text-sm transition-colors">
                  {lang}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-gold">Connect</h4>
            <a
              href="https://www.facebook.com/profile.php?id=100066383790426"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-gold text-sm transition-colors"
            >
              <FaFacebook size={16} />
              Follow us on Facebook
            </a>
            <div className="mt-4">
              <Link to="/empowering-nation" className="text-cream/60 hover:text-gold text-sm transition-colors">
                Empowering Nation Initiative
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="border-t border-cream/10 pt-6 text-center text-cream/40 text-xs">
        © 2025 Language Society and Cultural Hub. Founded by Iqra Siraj.
      </div>
    </div>
  </footer>
);

export default Footer;
