import { Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/80 border-t border-border py-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-foreground text-base">
              Harshith Kumar Reddy
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Full Stack Engineer &bull; AI-Native Builder &bull; Bengaluru, India
            </p>
            <p className="text-xs text-muted-foreground/80 mt-2">
              &copy; {currentYear} Harshith Kumar Reddy. Crafted with AI-native agility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/harshithreddy-08"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all border border-border"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/harshithreddy08"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all border border-border"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:harshitkumar.reddy08@gmail.com"
              className="p-2.5 rounded-xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all border border-border"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
