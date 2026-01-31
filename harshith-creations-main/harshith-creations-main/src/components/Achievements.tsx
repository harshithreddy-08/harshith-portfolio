import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Award, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const achievements = [
  {
    title: "Certificate of Appreciation",
    organization: "Astram Labs, IIT Hyderabad",
    description:
      "Recognized for developing and deploying a professional website with exceptional quality and performance.",
    link: "https://drive.google.com/file/d/11MSHoAydt4cnB90ybTB2G5lye7W1vd81/view?usp=sharing",
  },
  {
    title: "Certificate of Appreciation",
    organization: "SVRM College",
    description:
      "Acknowledged for building the official college website with modern design and accessibility features.",
    link: "https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link",
  },
  {
    title: "AI/ML Project Recognition",
    organization: "University Showcase",
    description:
      "Projects featured in university showcase for innovative applications of artificial intelligence and machine learning.",
  },
];

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Achievements & <span className="text-gradient">Recognition</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full border-primary/20 bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-2">
                          {achievement.organization}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.link && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="mt-4"
                          >
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-3 w-3" />
                              View Certificate
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
