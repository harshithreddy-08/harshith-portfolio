import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, Sparkles, Building, GraduationCap, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="resume-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-primary/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xl font-bold text-foreground">
                    Harshith Kumar Reddy &mdash; Resume
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Full Stack Engineer • AI-Native Builder • Bengaluru, India
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" className="btn-gradient text-primary-foreground gap-1.5">
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open in Google Drive
                  </a>
                </Button>
                <Button id="close-resume-modal-btn" variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content / Scrollable Resume Document */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8 text-foreground/90 font-sans">
              {/* Contact & Tagline */}
              <div className="border-b border-border pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      HARSHITH KUMAR REDDY
                    </h1>
                    <p className="text-primary font-semibold tracking-wide text-sm md:text-base mt-1">
                      FULL STACK ENGINEER &bull; AI-NATIVE BUILDER
                    </p>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground space-y-1 text-right">
                    <p className="flex items-center gap-1.5 justify-end">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> Bengaluru, India
                    </p>
                    <p className="flex items-center gap-1.5 justify-end">
                      <Phone className="h-3.5 w-3.5 text-primary" /> +91-8519949948
                    </p>
                    <p className="flex items-center gap-1.5 justify-end">
                      <Mail className="h-3.5 w-3.5 text-primary" /> harshitkumar.reddy08@gmail.com
                    </p>
                  </div>
                </div>

                {/* High-Agency Summary */}
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/15 text-sm leading-relaxed">
                  <strong className="text-primary font-semibold">High-Agency Startup Builder: </strong>
                  Hands-on engineer with a strong bias for action and proven end-to-end production delivery. Experienced in shipping scalable B2B platforms to 10,000+ users across 50+ institutions, designing high-throughput messaging infrastructure (NATS, Protobuf, WebSockets), and deploying multimodal AI media pipelines (Gemini, FFmpeg, speech-to-text). Daily AI-native workflow (Cursor, Claude, Copilot) for rapid shipping and zero-to-one problem solving.
                </div>
              </div>

              {/* Engineering & Startup Experience */}
              <div className="space-y-6">
                <h2 className="text-base font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Building className="h-4 w-4" /> Engineering &amp; Startup Experience
                </h2>

                {/* Experience 1 */}
                <div className="space-y-2 border-l-2 border-primary/30 pl-4 ml-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold text-foreground text-base">
                      AI Full-Stack Developer <span className="font-normal text-muted-foreground">&bull; ArivuPro Academy</span>
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono">
                      May 2026 – Present (5 Months) | Bengaluru, India
                    </div>
                  </div>
                  <p className="text-xs text-primary font-medium">Production Platform Engineering (Fast-Paced Scale)</p>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Scale &amp; Architecture:</strong> Architected, built, and shipped a microservices-based multi-tenant B2B SaaS platform serving 10,000+ active users across 50+ colleges using Node.js, FastAPI, PostgreSQL, and Docker.
                    </li>
                    <li>
                      <strong className="text-foreground">Real-Time Data &amp; Workflows:</strong> Built role-based analytics dashboards with real-time state synchronization; implemented tenant-isolated queries and automated data ingestion reducing institutional manual administrative effort by 40%.
                    </li>
                    <li>
                      <strong className="text-foreground">Autonomous Feature Ownership:</strong> Spearheaded continuous integration/deployment via GitHub Actions, owning deployments from schema design to frontend components with 99.8% service uptime.
                    </li>
                    <li>
                      <strong className="text-foreground">AI-Powered Automation:</strong> Integrated LLM-driven reporting, document-to-data extraction, and automated prompt evaluation pipelines, unblocking departmental operations and compressing reporting cycles from hours to minutes.
                    </li>
                  </ul>
                </div>

                {/* Experience 2 */}
                <div className="space-y-2 border-l-2 border-primary/30 pl-4 ml-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold text-foreground text-base">
                      Research Intern – Distributed Systems &amp; RL <span className="font-normal text-muted-foreground">&bull; IIT Tirupati (IDEAGEN Collaboration)</span>
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono">
                      May 2025 – Apr 2026 | Tirupati, India
                    </div>
                  </div>
                  <p className="text-xs text-primary font-medium">High-Throughput Distributed Messaging &amp; Security</p>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>
                      <strong className="text-foreground">Messaging &amp; Comms Infrastructure:</strong> Built a distributed web penetration testing engine powered by NATS messaging broker and Protocol Buffers, enabling sub-millisecond inter-agent communication.
                    </li>
                    <li>
                      <strong className="text-foreground">Agentic Automation:</strong> Engineered hierarchical multi-agent reinforcement learning pipelines targeting 15+ attack paths; cut manual security testing time by 60% with structured telemetry and automated triage.
                    </li>
                  </ul>
                </div>

                {/* Experience 3 */}
                <div className="space-y-2 border-l-2 border-primary/30 pl-4 ml-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold text-foreground text-base">
                      Frontend Developer (Contract) <span className="font-normal text-muted-foreground">&bull; ASTRAM Lab, IIT Hyderabad</span>
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono">2024 | Hyderabad, India</div>
                  </div>
                  <p className="text-xs text-primary font-medium">Production Web Portal</p>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li>
                      Delivered a responsive research web platform using React.js and modern state management with RESTful API integrations; recognized with official Letter of Appreciation for rapid feature turnaround.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Featured Projects */}
              <div className="space-y-4">
                <h2 className="text-base font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Featured What-I-Shipped Projects
                </h2>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-foreground text-sm md:text-base">
                        LingoCut – AI Video Dubbing &amp; Multimodal Audio Pipeline
                      </span>
                      <span className="text-xs text-primary font-mono font-medium">
                        Node.js, React, Gemini, FFmpeg, REST APIs
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
                      Built an end-to-end media automation platform converting educational video into colloquial, code-switched voiceovers across 12 Indian regional language variants with pitch-preserved audio synchronization. Designed resilient background worker queues with per-segment retries, checkpoint/resume logic, and audio-transcription validation to guarantee zero job drop-off.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-foreground text-sm md:text-base">
                        Autonomous AI Data Analyst &amp; Query Agent
                      </span>
                      <span className="text-xs text-primary font-mono font-medium">
                        FastAPI, LangChain, OpenAI API, Streamlit, PostgreSQL
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
                      Engineered an autonomous conversational data agent with self-correcting tool-use chains (profiling, filtering, SQL generation, and dynamic chart rendering) achieving 91% accuracy on tabular benchmarks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Capabilities & Builder Toolkit */}
              <div className="space-y-3">
                <h2 className="text-base font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Technical Capabilities &amp; Builder Toolkit
                </h2>

                <div className="grid sm:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="font-semibold text-foreground block mb-1">Languages &amp; Runtimes</span>
                    <span className="text-muted-foreground">Python, JavaScript (ES6+), TypeScript, SQL, Node.js</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="font-semibold text-foreground block mb-1">Frameworks &amp; Web</span>
                    <span className="text-muted-foreground">FastAPI, Django, React, Next.js, Express, RESTful APIs, WebSockets</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="font-semibold text-foreground block mb-1">Comms &amp; Infrastructure</span>
                    <span className="text-muted-foreground">NATS Messaging, Protocol Buffers, Docker, PostgreSQL, MySQL, Redis, Git/CI/CD</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border border-border">
                    <span className="font-semibold text-foreground block mb-1">AI &amp; Media Pipelines</span>
                    <span className="text-muted-foreground">LLM Orchestration (Gemini, OpenAI, Claude), Multimodal Audio/FFmpeg, LangChain, Cursor</span>
                  </div>
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="space-y-3">
                <h2 className="text-base font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Education &amp; Key Achievements
                </h2>

                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2 text-xs md:text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-bold text-foreground">
                      B.Tech in Computer Science &amp; Engineering (Data Science) &bull; Mohan Babu University
                    </span>
                    <span className="font-mono text-primary font-bold">
                      CGPA: 8.63 / 10.0 | 2022 – 2026
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      Runner-Up: Healthcare AI Hackathon (IDEAGEN, 2025 – 24hr risk system)
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      HackerRank SQL Certified
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Letter of Appreciation (IIT Hyderabad)
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Letter of Appreciation (SVRM College)
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="p-4 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                Ready for High-Pace Startup Deployment &bull; Immediate Availability
              </span>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-1.5" />
                    Download / View on Drive
                  </a>
                </Button>
                <Button size="sm" onClick={onClose} className="btn-gradient text-primary-foreground">
                  Close Preview
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
