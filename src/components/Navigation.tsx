import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, FileText, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const driveResumeUrl = "https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/80 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform">
            HK
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Harshith <span className="text-primary font-mono text-xs px-1.5 py-0.5 rounded bg-primary/10">AI Builder</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
          
          <Button
            asChild
            size="sm"
            className="btn-gradient text-primary-foreground text-xs font-semibold px-3 py-1.5 shadow-sm"
          >
            <a
              href={driveResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" />
              Resume
            </a>
          </Button>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="btn-gradient text-primary-foreground text-xs px-2.5 py-1"
          >
            <a
              href={driveResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border shadow-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/90 hover:text-primary transition-colors font-medium py-1.5 text-sm"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <Button
                asChild
                size="sm"
                className="btn-gradient text-primary-foreground text-xs w-full"
              >
                <a
                  href={driveResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  View Full Resume (Drive)
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
