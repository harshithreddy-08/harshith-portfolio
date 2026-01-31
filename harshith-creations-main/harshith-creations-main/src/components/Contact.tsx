import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "harshithkumar.reddy08@gmail.com",
    href: "mailto:harshithkumar.reddy08@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8519994948",
    href: "tel:+918519994948",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "harshithreddy08",
    href: "https://linkedin.com/in/harshithreddy08",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "harshith-08",
    href: "https://github.com/harshith-08",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tirupati, Andhra Pradesh",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, innovative projects,
              or just having a chat about technology!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-hover border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                          <contact.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {contact.label}
                          </p>
                          {contact.href ? (
                            <a
                              href={contact.href}
                              target={
                                contact.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                contact.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="text-lg font-semibold text-foreground hover:text-primary transition-colors break-all"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-lg font-semibold text-foreground">
                              {contact.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Card className="border-accent/50 bg-accent/5">
                <CardContent className="p-8">
                  <p className="text-lg mb-6">
                    Ready to collaborate? Let's build something amazing together!
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="btn-gradient text-primary-foreground"
                  >
                    <a href="mailto:harshithkumar.reddy08@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Me an Email
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
