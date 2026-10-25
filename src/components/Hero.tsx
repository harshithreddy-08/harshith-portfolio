import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileText, Sparkles, Zap, ShieldCheck, Terminal, Cpu, Database } from "lucide-react";
import { Button } from "./ui/button";
import { ParticleBackground } from "./ParticleBackground";
import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { ResumeModal } from "./ResumeModal";

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const driveResumeUrl = "https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.7,
      },
    }),
  };

  const metrics = [
    { value: "10,000+", label: "Active B2B Users Scaled", sub: "50+ Colleges" },
    { value: "99.8%", label: "Service Uptime", sub: "CI/CD & Docker" },
    { value: "<1ms", label: "Inter-Agent Latency", sub: "NATS Broker" },
    { value: "91%", label: "AI Tabular Benchmark", sub: "Self-correcting Agent" },
    { value: "8.63", label: "CGPA (Data Science)", sub: "Mohan Babu Univ" },
  ];

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28 pb-16"
        style={{ background: "var(--gradient-hero)" }}
      >
        <ParticleBackground />

        {/* Ambient Gradient Orbs */}
        <motion.div
          className="absolute top-16 left-5 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, 25, 0],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-12 right-5 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -35, 0],
            y: [0, -40, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* LEFT SIDE: Text, Badges, and Calls to Action */}
            <motion.div
              className="flex-1 text-center lg:text-left order-1"
              initial="hidden"
              animate="visible"
            >
              {/* High-Agency Startup Pill */}
              <motion.div custom={0} variants={textVariants} className="inline-block mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/25 rounded-full text-primary text-xs md:text-sm font-semibold shadow-sm backdrop-blur-md">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 -ml-4" />
                  <span>High-Agency Startup Builder &bull; AI-Native Engineer</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight"
              >
                Hi, I'm{" "}
                <span className="text-gradient inline-block">
                  Harshith Kumar Reddy
                </span>
              </motion.h1>

              {/* Roles & Taglines */}
              <motion.div custom={2} variants={textVariants} className="mb-6 space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/90">
                  Full Stack Engineer <span className="text-primary">&bull;</span> AI-Native Builder
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Hands-on engineer with a strong bias for action. I architect and ship scalable B2B platforms
                  to <strong className="text-foreground">10,000+ users across 50+ colleges</strong>, engineer sub-millisecond
                  distributed messaging systems with <strong className="text-foreground">NATS &amp; Protobuf</strong>, and deploy
                  multimodal AI pipelines.
                </p>
              </motion.div>

              {/* Startup Agility Tags */}
              <motion.div
                custom={3}
                variants={textVariants}
                className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 text-xs font-mono"
              >
                <span className="px-3 py-1 rounded-md bg-muted/70 border border-border text-foreground/80 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" /> 0-to-1 Rapid Shipping
                </span>
                <span className="px-3 py-1 rounded-md bg-muted/70 border border-border text-foreground/80 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-primary" /> Daily AI-Native (Cursor + Claude)
                </span>
                <span className="px-3 py-1 rounded-md bg-muted/70 border border-border text-foreground/80 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 99.8% Production Uptime
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                custom={4}
                variants={textVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start items-center"
              >
                {/* Primary Direct Drive Resume Button */}
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    asChild
                    size="lg"
                    className="btn-gradient text-primary-foreground font-semibold shadow-lg group cursor-pointer"
                  >
                    <a
                      href={driveResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform" />
                      View Resume
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </motion.div>

                {/* Quick Interactive Modal Preview */}
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    id="quick-preview-btn"
                    variant="outline"
                    size="lg"
                    onClick={() => setIsResumeOpen(true)}
                    className="border-primary/30 group cursor-pointer"
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary group-hover:rotate-12 transition-transform" />
                    Quick Preview
                  </Button>
                </motion.div>

                <div className="flex items-center gap-2 pl-2">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <a
                        href="https://linkedin.com/in/harshithreddy08"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button asChild variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <a
                        href="https://github.com/harshithreddy-08"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 text-primary" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: Profile Image with High-Tech Glow, Interactive 3D Frame & Floating Tech Badges */}
            <motion.div
              className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center lg:justify-end order-2"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative perspective-1000"
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glowing Aura Rings behind photo */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-emerald-500 rounded-3xl blur-2xl opacity-40 animate-pulse pointer-events-none" />
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-accent rounded-3xl opacity-80" />

                {/* Profile Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-card/90 backdrop-blur-xl border border-border/80 shadow-2xl p-2 sm:p-3">
                  {/* Photo Frame */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted/50 group">
                    <img
                      src={profileImg}
                      alt="Harshith Kumar Reddy - Full Stack Engineer & AI-Native Builder"
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient Overlay for Sleek Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-80" />

                    {/* Bottom Status Card inside Photo */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-card/85 backdrop-blur-md border border-border/70 shadow-lg text-left">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            Open to Startup Roles
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-medium text-primary">
                          Bengaluru, IN
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Ready for High-Pace Startup Deployment &bull; 0 &rarr; 1 Delivery
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Badges around Image */}
                <motion.div
                  className="absolute -top-4 -left-4 px-3 py-1.5 rounded-xl bg-card/95 border border-primary/30 shadow-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Cpu className="h-3.5 w-3.5 text-primary" />
                  <span>Multimodal AI (Gemini)</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/3 -right-5 px-3 py-1.5 rounded-xl bg-card/95 border border-accent/30 shadow-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>NATS (<span className="text-emerald-500 font-mono">&lt;1ms</span>)</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl bg-card/95 border border-border shadow-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Database className="h-3.5 w-3.5 text-emerald-500" />
                  <span>FastAPI + PostgreSQL</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/60"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-card/40 border border-border/50 backdrop-blur-sm text-center hover:border-primary/30 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient mb-0.5 font-mono">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={driveResumeUrl}
      />
    </>
  );
}
