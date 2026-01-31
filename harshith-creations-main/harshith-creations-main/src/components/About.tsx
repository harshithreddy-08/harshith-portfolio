import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Sparkles, Code, Rocket, Target } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable solutions",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Production-grade projects on time",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Focused on measurable impact",
  },
];

export function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        style={{ y }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          style={{ opacity }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5 }}
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <Card className="card-hover border-primary/20 overflow-hidden group relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  className="p-3 bg-primary/10 rounded-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="flex-1">
                  <motion.p
                    className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    I'm a passionate developer focused on crafting scalable web
                    applications and AI-driven solutions. My expertise spans
                    frontend technologies, backend systems, and deep learning
                    models.
                  </motion.p>
                  <motion.p
                    className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    I've successfully delivered production-grade projects like{" "}
                    <strong>Astram Labs for IITH</strong> and the{" "}
                    <strong>SVRM College website</strong>, both recognized with
                    appreciation letters for their quality and impact.
                  </motion.p>
                  <motion.p
                    className="text-lg md:text-xl text-foreground/90 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    As a <strong>Final-Year B.Tech CSE Student</strong> at Mohan
                    Babu University, I'm eager to bring my skills to innovative
                    teams and contribute to meaningful projects.
                  </motion.p>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-background/50 rounded-lg border border-border/50 backdrop-blur-sm"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <highlight.icon className="h-8 w-8 text-primary mb-3" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <h3 className="text-xl font-semibold mb-3 text-accent relative z-10">
                  💼 Open to Opportunities
                </h3>
                <p className="text-foreground/80 relative z-10">
                  Currently seeking internships where I can leverage my full-stack
                  development and AI/ML expertise to create impactful solutions.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
