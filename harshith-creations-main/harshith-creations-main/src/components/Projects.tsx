import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github, Award, Sparkles, Bot, Video, Database, CheckCircle2, Cpu } from "lucide-react";
import { Badge } from "./ui/badge";
import portfolioData from "../data/portfolio.json";

function ProjectCard({ project, index }: { project: typeof portfolioData.projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col border transition-all duration-300 relative overflow-hidden bg-card/70 backdrop-blur-md ${
          project.featured
            ? "border-primary/40 shadow-lg shadow-primary/5 hover:border-primary"
            : "border-border/70 hover:border-primary/30"
        }`}
      >
        {/* Top Glow bar for featured projects */}
        {project.featured && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-emerald-500" />
        )}

        <CardHeader className="pb-3 pt-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            {project.badge ? (
              <Badge
                variant="outline"
                className="text-xs font-semibold px-2.5 py-0.5 border-primary/40 bg-primary/10 text-primary"
              >
                {project.badge}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Engineering Project
              </Badge>
            )}

            <div className="flex items-center gap-1">
              {"website" in project && project.website && (
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </a>
                </Button>
              )}
              {"github" in project && project.github && (
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-4 w-4 text-primary" />
                  </a>
                </Button>
              )}
              {"certificate" in project && project.certificate && (
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-full" title="View Certificate">
                  <a
                    href={project.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Certificate of Appreciation"
                  >
                    <Award className="h-4 w-4 text-accent" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <CardTitle className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <p className="text-xs font-mono font-medium text-primary mt-1">
            {project.subtitle}
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {project.description}
            </p>

            {"bullets" in project && Array.isArray(project.bullets) && (
              <div className="space-y-2 pt-1 border-t border-border/50">
                {project.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border/50">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {"website" in project && project.website && (
                <Button asChild size="sm" className="btn-gradient text-primary-foreground text-xs font-medium flex-1">
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Portal
                  </a>
                </Button>
              )}
              {"github" in project && project.github && (
                <Button asChild size="sm" variant="outline" className="text-xs font-medium flex-1">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    Source Code
                  </a>
                </Button>
              )}
              {"certificate" in project && project.certificate && !("website" in project && project.website) && (
                <Button asChild size="sm" variant="outline" className="text-xs font-medium flex-1">
                  <a href={project.certificate} target="_blank" rel="noopener noreferrer">
                    <Award className="mr-1.5 h-3.5 w-3.5 text-accent" />
                    Appreciation Letter
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = portfolioData.projects;

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>Featured What-I-Shipped</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Production &amp; <span className="text-gradient">AI Projects</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            From multimodal video dubbing pipelines and self-correcting query agents to deployed institutional portals.
          </p>
        </div>

        {/* Highlighted AI Flagship Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-5xl mx-auto p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/30 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-mono font-bold">
                <Bot className="h-3.5 w-3.5" />
                <span>MULTIMODAL AI &bull; FLAGSHIP PIPELINE</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
                LingoCut &mdash; AI Video Dubbing &amp; Multimodal Pipeline
              </h3>
              <p className="text-sm md:text-base text-foreground/80 max-w-3xl leading-relaxed">
                Converts educational videos into colloquial, code-switched voiceovers across 12 Indian regional language variants with pitch-preserved audio synchronization. Engineered resilient background worker queues with per-segment retries and audio-transcription validation to guarantee zero job drop-off during intensive media processing.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <Badge variant="outline" className="bg-card">Node.js</Badge>
                <Badge variant="outline" className="bg-card">React</Badge>
                <Badge variant="outline" className="bg-card">Gemini Multimodal</Badge>
                <Badge variant="outline" className="bg-card">FFmpeg Audio Chunking</Badge>
                <Badge variant="outline" className="bg-card">REST APIs</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
