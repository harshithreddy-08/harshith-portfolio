import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 92 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
    color: "from-blue-500 to-cyan-500",
    icon: "🎨",
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "PHP & MySQL", level: 80 },
    ],
    color: "from-green-500 to-emerald-500",
    icon: "⚙️",
  },
  {
    title: "AI/ML",
    skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow & Keras", level: 85 },
      { name: "Deep Learning", level: 85 },
    ],
    color: "from-purple-500 to-pink-500",
    icon: "🤖",
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
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
              Technical <span className="text-gradient">Skills</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                onHoverStart={() => setHoveredCategory(categoryIndex)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Card className="card-hover h-full border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.span
                        className="text-4xl"
                        animate={{
                          rotate: hoveredCategory === categoryIndex ? 360 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {category.icon}
                      </motion.span>
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">
                              {skill.name}
                            </span>
                            <motion.span
                              className="text-xs text-muted-foreground"
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                            >
                              {skill.level}%
                            </motion.span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={
                                isInView ? { width: `${skill.level}%` } : { width: 0 }
                              }
                              transition={{
                                duration: 1,
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
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
