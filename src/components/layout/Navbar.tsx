import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendlyModal from "@/components/CalendlyModal";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Services", href: "#services" },
  { name: "Impact", href: "#impact" },
  { name: "FAQ", href: "#faq" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleNavClick = (href: string) => {
    if (!isHomePage && href.startsWith("#")) {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                AgenticForce
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                isHomePage ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={`/${link.href}`}
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="lg">
                    Sign In
                  </Button>
                </Link>
              )}
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setIsCalendlyOpen(true)}
              >
                Request Demo
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border"
            >
              <div className="container-padding py-4 space-y-4">
                {navLinks.map((link) => (
                  isHomePage ? (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={`/${link.href}`}
                      onClick={() => {
                        setIsOpen(false);
                        handleNavClick(link.href);
                      }}
                      className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="pt-2 space-y-2">
                  {user ? (
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setIsCalendlyOpen(true);
                    }}
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </>
  );
};
