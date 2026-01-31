import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileText, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { ParticleBackground } from "./ParticleBackground";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
      setMousePosition({ x: e.clientX, y: e.clientY });
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
        duration: 0.8,
      },
    }),
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <ParticleBackground />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <Sparkles className="h-6 w-6 text-primary" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              custom={0}
              variants={textVariants}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
                Welcome to my portfolio 👋
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Hi, I'm{" "}
              <motion.span
                className="text-gradient inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                K Harshit Kumar Reddy
              </motion.span>
            </motion.h1>

            <motion.div custom={2} variants={textVariants} className="mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground">
                {["AI/ML Engineer", "Full Stack Developer", "Frontend Developer"].map(
                  (role, index) => (
                    <motion.span
                      key={role}
                      className="inline-block"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.2,
                        duration: 0.5,
                      }}
                    >
                      {role}
                      {index < 2 && " • "}
                    </motion.span>
                  )
                )}
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={textVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="btn-gradient text-primary-foreground group"
                >
                  <a
                    href="https://drive.google.com/file/d/1OD1Wa6sl5B0R2ZK95aYi-wk7m3iz4vf9/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    View Resume
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="group">
                  <a
                    href="https://linkedin.com/in/harshithreddy08"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="group">
                  <a
                    href="https://github.com/harshith-08"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
