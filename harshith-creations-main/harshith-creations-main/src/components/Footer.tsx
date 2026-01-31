import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            © {currentYear} K Harshit Kumar Reddy. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/harshith-08"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/harshithreddy08"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:harshithkumar.reddy08@gmail.com"
              className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
