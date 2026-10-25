import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Award, ExternalLink, Trophy, CheckCircle, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import portfolioData from "../data/portfolio.json";

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = portfolioData.achievements;

  return (
    <section id="achievements" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold mb-3"
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>Honors &amp; Credentials</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Key Achievements &amp; <span className="text-gradient">Recognition</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Verified accolades across national AI hackathons, institutional letters of appreciation, and technical certifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full border-border/80 bg-card/60 backdrop-blur-md flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-1.5 text-foreground leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-primary font-semibold mb-3">
                    {achievement.organization}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>

                {"link" in achievement && achievement.link && (
                  <div className="p-6 pt-0">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full text-xs font-medium border-primary/20 hover:border-primary"
                    >
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        View Certificate
                      </a>
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
