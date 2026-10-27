import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, Linkedin, Github, MapPin, FileText, Send, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { ResumeModal } from "./ResumeModal";
import portfolioData from "../data/portfolio.json";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "harshitkumar.reddy08@gmail.com",
    href: "mailto:harshitkumar.reddy08@gmail.com",
    caption: "Direct contact",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91-8519949948",
    href: "tel:+918519949948",
    caption: "Call or message",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "harshithreddy08",
    href: "https://linkedin.com/in/harshithreddy08",
    caption: "Professional network",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "harshithreddy-08",
    href: "https://github.com/harshithreddy-08",
    caption: "Code & repositories",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bengaluru, India",
    caption: "Available immediately for on-site & remote roles",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const driveResumeUrl = portfolioData.contact.resumeUrl || "https://drive.google.com/file/d/11I75Xndc2s0IUP47EZPlVxzE2_qZCw9g/view?usp=sharing";

  return (
    <>
      <section id="contact" className="py-24 bg-background relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10" ref={ref}>
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold mb-3"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to Full-Time Roles &bull; Immediate Availability</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Let's Build Something <span className="text-gradient">Extraordinary</span>
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Targeting Full-Stack &amp; AI Engineering roles at high-pace startups and innovative engineering teams.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Contact Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="card-hover border-border/80 bg-card/60 backdrop-blur-md h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                          <contact.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono font-medium text-muted-foreground uppercase">
                            {contact.label}
                          </p>
                          {contact.href ? (
                            <a
                              href={contact.href}
                              target={contact.href.startsWith("http") ? "_blank" : undefined}
                              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-base font-bold text-foreground hover:text-primary transition-colors block mt-0.5 truncate"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-base font-bold text-foreground mt-0.5">
                              {contact.value}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {contact.caption}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Resume Card in Contact Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: contactInfo.length * 0.08 }}
              >
                <Card className="card-hover border-primary/40 bg-gradient-to-br from-primary/10 via-card to-accent/10 h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/20 rounded-xl text-primary flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-medium text-primary uppercase">
                          Official Resume
                        </p>
                        <p className="text-base font-bold text-foreground mt-0.5">
                          View &amp; Download Resume
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Google Drive &bull; PDF format
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="btn-gradient text-primary-foreground w-full cursor-pointer"
                      >
                        <a href={driveResumeUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1.5" />
                          Open Google Drive
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsResumeOpen(true)}
                        className="w-full text-xs cursor-pointer border-primary/20"
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        Quick On-Page Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Callout Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 overflow-hidden relative">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                    Ready for High-Pace Startup Deployment
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm md:text-base">
                    Whether you're scaling an AI platform, optimizing high-throughput distributed systems, or building a zero-to-one product &mdash; let's connect.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="btn-gradient text-primary-foreground font-semibold">
                      <a href="mailto:harshitkumar.reddy08@gmail.com">
                        <Send className="mr-2 h-4 w-4" />
                        Send Direct Email
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-primary/30 cursor-pointer"
                    >
                      <a href={driveResumeUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        View Resume (Drive)
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={driveResumeUrl}
      />
    </>
  );
}
