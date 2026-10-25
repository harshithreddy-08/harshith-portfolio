import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Calendar, MapPin, CheckCircle, Cpu, Network, Shield, ArrowUpRight } from "lucide-react";
import portfolioData from "../data/portfolio.json";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = portfolioData.experience;

  const roleIcons = [Cpu, Network, Shield];

  return (
    <section id="experience" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute bottom-10 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Proven Track Record</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Engineering &amp; <span className="text-gradient">Startup Experience</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            From zero-to-one architecture to scaling multi-tenant B2B platforms and distributed AI agent swarms.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => {
            const Icon = roleIcons[index % roleIcons.length];
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="card-hover border-border/80 bg-card/70 backdrop-blur-md overflow-hidden relative group">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent" />
                  
                  <CardContent className="p-6 md:p-8 pl-8 md:pl-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                          <span className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-2xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                        </div>
                        <div className="text-lg font-semibold text-primary flex items-center gap-2">
                          <span>{exp.company}</span>
                          <span className="text-xs text-muted-foreground font-normal">
                            &bull; {exp.badge}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-1 text-xs md:text-sm text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-accent" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2.5 mt-5">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-foreground/85 leading-relaxed">
                          <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border/60">
                      {exp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
