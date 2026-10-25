import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bot, Server, Layout, Cpu, Terminal, CheckCircle2, Sparkles } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  highlight?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: any;
  skills: SkillItem[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Multimodal Pipelines",
    subtitle: "Orchestration, Agentic Tool-Use & Media Automation",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
    skills: [
      { name: "LLM Orchestration (Gemini, Claude, OpenAI)", level: 95, highlight: "Production Scale" },
      { name: "Agentic Tool-Use & LangChain", level: 92, highlight: "Self-correcting Chains" },
      { name: "Multimodal Audio/Video (FFmpeg, Whisper)", level: 88, highlight: "Pitch-preserved sync" },
      { name: "AI-Native Workflow (Cursor, Copilot)", level: 96, highlight: "10x shipping velocity" },
      { name: "Deep Learning (TensorFlow, Keras, CNNs)", level: 86, highlight: "Medical MRI Vision" },
    ],
  },
  {
    title: "Backend & Distributed Systems",
    subtitle: "Microservices, Low-Latency Messaging & Scalable APIs",
    icon: Server,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "FastAPI & Python", level: 93, highlight: "Async REST APIs" },
      { name: "Node.js & Express", level: 88, highlight: "Microservices" },
      { name: "NATS Messaging & WebSockets", level: 87, highlight: "<1ms inter-agent" },
      { name: "Protocol Buffers & Serialization", level: 85, highlight: "Binary efficiency" },
      { name: "PostgreSQL, MySQL & Redis", level: 90, highlight: "Tenant-isolated data" },
    ],
  },
  {
    title: "Frontend & Web Architecture",
    subtitle: "Modern Interactive SPAs & Responsive Design",
    icon: Layout,
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "React.js & Next.js", level: 92, highlight: "Production grade" },
      { name: "TypeScript & JavaScript (ES6+)", level: 90, highlight: "Type-safe apps" },
      { name: "Tailwind CSS & Modern UI", level: 94, highlight: "Fluid animations" },
      { name: "State Management & REST Integration", level: 90, highlight: "Real-time sync" },
    ],
  },
  {
    title: "Comms, Cloud & DevOps",
    subtitle: "Containerization, CI/CD & Production Reliability",
    icon: Cpu,
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "Docker & Containerization", level: 88, highlight: "Multi-tenant deployment" },
      { name: "GitHub Actions CI/CD", level: 88, highlight: "99.8% uptime ownership" },
      { name: "SQL Optimization & Schema Design", level: 92, highlight: "HackerRank Certified" },
      { name: "Git & Agile Workflow", level: 94, highlight: "Rapid release cycles" },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.25, 1], x: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Builder Toolkit</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical Capabilities &amp; <span className="text-gradient">Skill Stack</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Grounded in production delivery across high-throughput messaging, AI orchestration, and full-stack web platforms.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                onMouseEnter={() => setActiveCategory(categoryIndex)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Card className="card-hover h-full border-border/80 bg-card/60 backdrop-blur-md overflow-hidden relative group">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
                  
                  <CardContent className="p-6 md:p-8">
                    {/* Category Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {category.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Skill Bars */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="font-semibold text-foreground flex items-center gap-1.5">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {skill.highlight && (
                                <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                  {skill.highlight}
                                </span>
                              )}
                              <span className="font-mono text-xs font-bold text-primary">
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full h-2 bg-muted/60 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{
                                duration: 1.1,
                                delay: categoryIndex * 0.1 + skillIndex * 0.08,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* AI Enthusiast & Daily Stack Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-primary/25 backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground text-sm sm:text-base">
                  Ready to deploy on day one
                </h4>
                <p className="text-xs text-muted-foreground">
                  Fluent in microservices, low-latency queues, and modern agentic LLM orchestration.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
              <Badge variant="outline" className="text-xs bg-card font-mono">FastAPI</Badge>
              <Badge variant="outline" className="text-xs bg-card font-mono">NATS</Badge>
              <Badge variant="outline" className="text-xs bg-card font-mono">Gemini AI</Badge>
              <Badge variant="outline" className="text-xs bg-card font-mono">React</Badge>
              <Badge variant="outline" className="text-xs bg-card font-mono">Docker</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
