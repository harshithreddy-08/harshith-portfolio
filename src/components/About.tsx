import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Sparkles, Zap, Bot, Rocket, Terminal, GraduationCap, CheckCircle2, Award, Flame } from "lucide-react";
import portfolioData from "../data/portfolio.json";

const pillars = [
  {
    icon: Flame,
    title: "High-Agency Startup Mindset",
    description: "Bias for action, zero-to-one problem solving, and total ownership from schema design to deployment.",
    badge: "Startup DNA",
  },
  {
    icon: Bot,
    title: "AI-Native Engineering",
    description: "Daily workflow powered by Cursor, Claude, Gemini, and LangChain for rapid iteration and 10x throughput.",
    badge: "AI-First",
  },
  {
    icon: Rocket,
    title: "Scale & Distributed Systems",
    description: "Shipped microservices serving 10,000+ users across 50+ colleges with sub-millisecond NATS messaging.",
    badge: "Production Tested",
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

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden" ref={containerRef}>
      {/* Ambient background glow */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        style={{ y }}
      />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-3"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>High-Agency Builder Profile</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About <span className="text-gradient">Me &amp; My Engineering Philosophy</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Obsessed with building zero-to-one products, multimodal AI systems, and scalable distributed architectures.
          </p>
        </div>

        <Card className="card-hover border-primary/20 overflow-hidden relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
          
          <CardContent className="p-8 md:p-12 relative z-10 space-y-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-5 text-foreground/90 text-base md:text-lg leading-relaxed">
                <p>
                  I'm a <strong className="text-foreground font-semibold">Full Stack Engineer &amp; AI-Native Builder</strong> based
                  in Bengaluru, India. I thrive in high-velocity startup environments where engineering speed, autonomy, and
                  customer-centric architecture matter most.
                </p>
                <p>
                  At <strong className="text-primary font-semibold">ArivuPro Academy</strong>, I architected and shipped a multi-tenant B2B SaaS platform serving over <strong className="text-foreground font-semibold">10,000+ active users across 50+ colleges</strong> using FastAPI, Node.js, PostgreSQL, and Docker, maintaining a 99.8% production uptime while automating institutional workloads with LLMs.
                </p>
                <p>
                  In distributed research with <strong className="text-accent font-semibold">IIT Tirupati (IDEAGEN Collaboration)</strong>, I engineered sub-millisecond messaging backbones using <strong className="text-foreground font-semibold">NATS and Protocol Buffers</strong>, as well as multi-agent reinforcement learning pipelines that cut testing times by 60%.
                </p>
                
                {/* Academic credentials */}
                <div className="pt-3 border-t border-border flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">B.Tech in Computer Science &amp; Engineering (Data Science)</span>
                    <br />
                    <span>Mohan Babu University &bull; </span>
                    <strong className="text-primary font-mono font-bold">CGPA: 8.63 / 10.0</strong> (2022 – 2026)
                  </div>
                </div>
              </div>

              {/* Right Column: Key Startup Highlights & Daily AI Workflow */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-muted/40 border border-border backdrop-blur-sm space-y-4">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    Daily AI-Native Dev Stack
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I leverage cutting-edge AI coding environments to ship at 10x pace without compromising architectural integrity:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-card border border-border text-primary font-semibold">Cursor IDE</span>
                    <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground">Claude 3.7 / 3.5</span>
                    <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground">Gemini 2.5 Flash</span>
                    <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground">LangChain</span>
                    <span className="px-2.5 py-1 rounded-md bg-card border border-border text-foreground">Copilot</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Zap className="h-4 w-4" />
                    <span>Why I Fit Early-Stage &amp; High-Growth Teams</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span><strong>0 &rarr; 1 Velocity:</strong> Can take vague product requirements to live production in days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Full-Stack Breadth:</strong> Database schema, microservices, websockets, and pixel-perfect UIs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Multimodal AI Mastery:</strong> Real-time voiceovers, audio synchronization, and self-correcting agents.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 bg-card/60 rounded-xl border border-border/80 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <pillar.icon className="h-7 w-7 text-primary" />
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
