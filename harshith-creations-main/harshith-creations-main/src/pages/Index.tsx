import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HarshBot } from "@/components/HarshBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      <HarshBot />
    </div>
  );
};

export default Index;
