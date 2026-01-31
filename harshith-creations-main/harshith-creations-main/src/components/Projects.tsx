import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github, Award, Heart, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Astram Labs (IITH)",
    description:
      "Developed and deployed a professional, responsive website for Astram Labs, IIT Hyderabad with optimized UI and performance.",
    website: "https://astramlabiith.in",
    certificate:
      "https://drive.google.com/file/d/11MSHoAydt4cnB90ybTB2G5lye7W1vd81/view?usp=sharing",
    tags: ["React", "Responsive Design", "UI/UX"],
    featured: true,
  },
  {
    title: "SVRM College Website",
    description:
      "Built the official site for Sree Velagapudi Ramakrishna Memorial College with focus on accessibility and modern design.",
    website: "https://www.svrmc.in",
    certificate:
      "https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link",
    tags: ["Web Development", "Accessibility", "Modern Design"],
    featured: true,
  },
  {
    title: "Brain Tumor Detection",
    description:
      "CNN-based deep learning model built using Keras and Flask for classifying brain tumor MRI images.",
    github: "https://github.com/harshithreddy-08/brain-tumor-app",
    tags: ["AI/ML", "Keras", "Flask", "CNN"],
  },
  {
    title: "Attendance Automation",
    description:
      "Automated attendance system using AI-powered facial recognition technology.",
    github: "https://github.com/harshithreddy-08/Attendence-recognition-",
    tags: ["Face Detection", "AI", "Automation"],
  },
  {
    title: "Food Waste Management System",
    description:
      "Platform for efficient food resource management and redistribution.",
    website: "https://enchanting-manatee-258768.netlify.app/#contact",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Travel Nest",
    description:
      "Full-stack tours and travel management website with user and admin modules.",
    tags: ["PHP", "MySQL", "Full Stack"],
  },
  {
    title: "Health Data Processing System",
    description:
      "Real-time health data processing with AI-based health recommendations.",
    tags: ["Flask", "TensorFlow", "AI Dashboard"],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]));

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <Card
        className={`h-full flex flex-col relative overflow-hidden group ${
          project.featured
            ? "border-primary/50 bg-primary/5"
            : "border-border"
        }`}
        style={{
          transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />

        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-2">
            <motion.span
              className="text-xl"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.title}
            </motion.span>
            {project.featured && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-5 w-5 text-primary flex-shrink-0" />
              </motion.div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-muted-foreground mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge variant="outline" className="text-xs">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.website && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="sm" variant="default" className="group">
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                    Visit Site
                  </a>
                </Button>
              </motion.div>
            )}
            {project.github && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="sm" variant="outline" className="group">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Code
                  </a>
                </Button>
              </motion.div>
            )}
            {project.certificate && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="sm" variant="secondary" className="group">
                  <a
                    href={project.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Award className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Certificate
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
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
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* GoStops Comprehensive Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 space-y-8"
          >
            {/* Why I Love GoStops - Hero */}
            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/5 overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />
              
              <CardContent className="p-10 relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 mb-4"
                  >
                    <Heart className="h-8 w-8 text-accent animate-pulse" fill="currentColor" />
                    <h3 className="text-4xl font-bold text-gradient">Why I Love GoStops</h3>
                    <Heart className="h-8 w-8 text-accent animate-pulse" fill="currentColor" />
                  </motion.div>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-foreground/90 max-w-4xl mx-auto leading-relaxed"
                  >
                    GoStops is my favorite hospitality brand because it embodies vibrant, youth-friendly, 
                    and technology-driven experiences. Their focus on community-driven stays, seamless digital 
                    booking, and affordable travel resonates deeply with my own vision for modern accommodations.
                  </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {/* GoStops Replica */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                  >
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      GoStops Replica Project
                    </h4>
                    <p className="text-foreground/80 mb-4">
                      I replicated the GoStops Bengaluru page to demonstrate my passion and technical skills, 
                      mirroring their innovative approach to hospitality.
                    </p>
                    <Button asChild className="w-full btn-gradient group">
                      <a
                        href="https://gostops-bengaluru-replica-32339-464.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
                        View GoStops Replica
                      </a>
                    </Button>
                  </motion.div>

                  {/* Travel Nest */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-accent/20"
                  >
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-accent" />
                      Travel Nest - Aligned Vision
                    </h4>
                    <p className="text-foreground/80 mb-4">
                      My platform connecting locals with hosts, offering seamless booking inspired by 
                      GoStops' youth-focused and tech-driven approach.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">PHP</Badge>
                      <Badge variant="outline" className="text-xs">MySQL</Badge>
                      <Badge variant="outline" className="text-xs">Full Stack</Badge>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Nest Details */}
            <Card className="border-primary/30 bg-primary/5 overflow-hidden relative">
              <CardContent className="p-8">
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-primary"
                >
                  Travel Nest – My Aligned Vision
                </motion.h3>
                
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  Travel Nest is my platform designed to connect locals with hosts, offering hassle-free 
                  booking of homestays and holiday packages. Inspired by GoStops, I built Travel Nest to provide:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: "🎯", text: "Youth-focused, intuitive UI/UX" },
                    { icon: "🏠", text: "Seamless holiday & homestay booking" },
                    { icon: "📊", text: "Admin dashboard for real-time management" },
                    { icon: "🤝", text: "Connect hosts and travelers" }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-primary/20"
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <p className="text-sm font-medium">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/80 italic">
                  My passion for GoStops inspired me to create features that mirror their focus on 
                  community, affordability, and tech-driven hospitality.
                </p>
              </CardContent>
            </Card>

            {/* GoStops AI Companion Project */}
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 overflow-hidden relative group">
              <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
              <CardContent className="p-8 relative z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-primary" />
                    <h3 className="text-3xl font-bold text-gradient">
                      goSTOPS AI Companion – Transforming Hostel Experiences
                    </h3>
                  </div>
                  
                  <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                    Built for <span className="font-semibold text-primary">goSTOPS</span>, India's leading youth hostel brand, 
                    this AI-powered web app matches solo travelers with their ideal hostel vibe across 30+ destinations. 
                    The platform features smart preference-based recommendations, a 24/7 hostel info chat assistant, 
                    and a seamless user experience that elevates guest satisfaction.
                  </p>

                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20 mb-6">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-accent" fill="currentColor" />
                      Why I Align with goSTOPS
                    </h4>
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      As a final-year Data Science student, I'm deeply inspired by goSTOPS' <span className="font-semibold">"tech-first, community-led"</span> mission. 
                      This project demonstrates my blend of technical skills and strategic thinking, providing scalable value 
                      for hostel chains and travel startups.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-primary/10 rounded-lg p-4 border border-primary/20"
                      >
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm font-medium">AI-Powered Matching</p>
                        <p className="text-xs text-muted-foreground mt-1">Smart recommendations for travelers</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-accent/10 rounded-lg p-4 border border-accent/20"
                      >
                        <div className="text-2xl mb-2">💬</div>
                        <p className="text-sm font-medium">24/7 Chat Assistant</p>
                        <p className="text-xs text-muted-foreground mt-1">Instant hostel information</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-primary/10 rounded-lg p-4 border border-primary/20"
                      >
                        <div className="text-2xl mb-2">🌍</div>
                        <p className="text-sm font-medium">30+ Destinations</p>
                        <p className="text-xs text-muted-foreground mt-1">Comprehensive coverage</p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6 border border-accent/30">
                    <p className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Seeking goSTOPS Internship
                    </p>
                    <p className="text-foreground/90 mb-4">
                      I'm seeking to join <span className="font-semibold text-primary">goSTOPS as an intern</span>, 
                      applying my skills to real-world travel solutions and helping shape the future of youth travel in India. 
                      Experience the live demo and see how I can contribute to your vision.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="lg" className="btn-gradient w-full group">
                        <a
                          href="https://solo-guide-buddy.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
                          Experience Live Demo
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Research & Market Gap Analysis */}
            <Card className="border-accent/30 bg-accent/5 overflow-hidden relative">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <CardContent className="p-8 relative z-10">
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 text-accent"
                >
                  Research & Market Gap Analysis
                </motion.h3>

                <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                  To better understand the market and identify opportunities, I conducted detailed research 
                  on the co-living sector (including platforms like Zolo Stays). This analysis highlights 
                  operational challenges, market gaps, and solutions that Travel Nest addresses—perfectly 
                  aligned with GoStops' innovative approach.
                </p>

                {/* Market Gap Insights */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-6"
                  >
                    <h4 className="font-bold text-xl mb-2 text-red-400">Problem Identified</h4>
                    <p className="text-sm text-foreground/80">
                      ~21,635 vacant beds in 55,000-bed portfolio
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      ₹57 crores annual loss
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      200+ properties shut down in Bangalore
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6"
                  >
                    <h4 className="font-bold text-xl mb-2 text-yellow-400">Proposed Solution</h4>
                    <p className="text-sm text-foreground/80">
                      Hybrid Daily-Monthly PG Model
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      Convert 50% vacant beds → daily rentals
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      ₹550/day including meals
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      Zero additional investment
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-6"
                  >
                    <h4 className="font-bold text-xl mb-2 text-green-400">Projected Impact</h4>
                    <p className="text-sm text-foreground/80">
                      Annual Revenue: <span className="font-bold">₹107.1 crores</span>
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      Loss Reduction: <span className="font-bold">187.9%</span>
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      Guest Savings: <span className="font-bold">50-65%</span> cheaper
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                      India's first systematic daily PG platform
                    </p>
                  </motion.div>
                </div>

                {/* Why Travel Nest Aligns */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-8 border border-primary/20"
                >
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Heart className="h-6 w-6 text-accent" fill="currentColor" />
                    Why Travel Nest Aligns with GoStops
                  </h4>
                  <ul className="space-y-2 text-foreground/90">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Connects locals with travelers through community-driven stays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Supports youth-centric, tech-driven hospitality experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Mirrors GoStops' operational and experiential model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Addresses market gaps with innovative hybrid solutions</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Downloadable Research Links */}
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-accent/30">
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-accent" />
                    Comprehensive Research & Data
                  </h4>
                  <p className="text-sm text-foreground/80 mb-4">
                    Explore my detailed market analysis, business proposals, and validation data:
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: "Business Proposal (PDF)",
                        url: "https://drive.google.com/file/d/13awsIlI0IY2346vbDpNm8ggrboCwe44-/view?usp=sharing",
                        icon: "📄"
                      },
                      {
                        title: "Data Source References",
                        url: "https://drive.google.com/file/d/1h79Awg5FZE5TnE54DgxNyQq0bIfU7VEn/view?usp=sharing",
                        icon: "📊"
                      },
                      {
                        title: "Market Validation Data",
                        url: "https://drive.google.com/file/d/1mynPQLued3Yn6h-lpof6KrrxtCMeQVd9/view?usp=sharing",
                        icon: "📈"
                      },
                      {
                        title: "Market Analysis & References",
                        url: "https://drive.google.com/file/d/1k96g9A8yfCRbX-vmNk0bdmyCoPdhHEX8/view?usp=sharing",
                        icon: "🔍"
                      }
                    ].map((doc, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start h-auto py-3 px-4 group"
                        >
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-2xl mr-3">{doc.icon}</span>
                            <span className="flex-1 text-left text-sm font-medium">{doc.title}</span>
                            <ExternalLink className="h-4 w-4 ml-2 group-hover:rotate-45 transition-transform" />
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-8 border border-primary/30"
            >
              <h4 className="text-2xl font-bold mb-3 text-gradient">
                Ready to Contribute to GoStops
              </h4>
              <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
                I bring not just technical expertise, but genuine enthusiasm for what GoStops represents 
                in the hospitality industry. Let's build the future of youth travel together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="btn-gradient">
                    <a href="#contact">
                      Get In Touch
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href="https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      View Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
