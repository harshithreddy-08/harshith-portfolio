import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Minimize2 } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

// ─── Gemini Config ────────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.8-flash",
];

const SYSTEM_PROMPT = `You are HarshBot — a friendly, sharp, and knowledgeable AI assistant built specifically for ${portfolioData.personal.name}'s portfolio website.

Your ONLY job is to answer questions about Harshith and his work. You have deep knowledge about everything below.

══════════════════ HARSHITH'S PROFILE ══════════════════
Name: ${portfolioData.personal.name}
Title: ${portfolioData.personal.title}
Location: ${portfolioData.personal.location}
Education: ${portfolioData.personal.education}
Bio: ${portfolioData.personal.bio}
Status: ${portfolioData.personal.status}

Contact:
  - Email: ${portfolioData.contact.email}
  - Phone: ${portfolioData.contact.phone}
  - LinkedIn: ${portfolioData.contact.linkedin}
  - GitHub: ${portfolioData.contact.github}

Key Metrics:
${portfolioData.metrics.map(m => `  • ${m.value} — ${m.label} (${m.sub})`).join("\n")}

══════════════════ EXPERIENCE ══════════════════
${portfolioData.experience.map(exp => `
[${exp.role} @ ${exp.company}] (${exp.period})
${exp.bullets.map(b => `  • ${b}`).join("\n")}
Tags: ${exp.tags.join(", ")}
`).join("\n")}

══════════════════ PROJECTS ══════════════════
${portfolioData.projects.map(p => `
[${p.title}]
${p.description}
${p.bullets ? p.bullets.map(b => `  • ${b}`).join("\n") : ""}
Tags: ${p.tags.join(", ")}
`).join("\n")}

══════════════════ SKILLS ══════════════════
AI and Media: ${portfolioData.skills.ai_media.map(s => s.name).join(", ")}
Backend and Distributed: ${portfolioData.skills.backend_distributed.map(s => s.name).join(", ")}
Frontend and Web: ${portfolioData.skills.frontend_web.map(s => s.name).join(", ")}
DevOps and Infra: ${portfolioData.skills.devops_infra.map(s => s.name).join(", ")}

══════════════════ ACHIEVEMENTS ══════════════════
${portfolioData.achievements.map(a => `  • ${a.title} — ${a.organization}: ${a.description}`).join("\n")}

══════════════════ YOUR BEHAVIOR ══════════════════
- Be concise but helpful. Use clean bullet points (•) for lists instead of asterisk (*) symbols.
- If someone asks you something unrelated to Harshith, gently redirect: "I'm HarshBot, I only know about Harshith's portfolio. Ask me anything about his skills, projects, or experience!"
- Be warm and enthusiastic about Harshith's work.
- When sharing contact info, format it neatly.
- Always respond in a professional yet conversational tone.
- Keep responses under 200 words unless the user asks for deep technical detail.`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

// ─── Gemini REST call (works seamlessly with AQ. and AIza keys) ───────────────
async function callGemini(
  history: GeminiContent[],
  userText: string,
  apiKey: string
): Promise<string> {
  const contents: GeminiContent[] = [
    ...history,
    { role: "user", parts: [{ text: userText }] },
  ];

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
  };

  let lastError = "";

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey.trim(),
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        return (
          data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "No response from Gemini."
        );
      }

      const errText = await res.text();
      console.warn(`[HarshBot] ${model} returned ${res.status}:`, errText);
      lastError = `API ${res.status}: ${errText.slice(0, 150)}`;
    } catch (err: unknown) {
      console.warn(`[HarshBot] Network error for ${model}:`, err);
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(lastError || "Failed to generate response from Gemini.");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STARTER_QUESTIONS = [
  "What projects has Harshith built?",
  "What are his top skills?",
  "Tell me about his work experience",
  "How can I contact Harshith?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HarshBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hey! I'm **HarshBot** — Harshith's personal AI assistant.\n\nAsk me anything about his projects, skills, experience, or how to get in touch!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Maintain conversation history for context
  const historyRef = useRef<GeminiContent[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    if (!GEMINI_API_KEY) {
      setError("Gemini API key missing. Add VITE_GEMINI_API_KEY to .env");
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const botText = await callGemini(historyRef.current, text.trim(), GEMINI_API_KEY);

      // Update conversation history
      historyRef.current = [
        ...historyRef.current,
        { role: "user", parts: [{ text: text.trim() }] },
        { role: "model", parts: [{ text: botText }] },
      ];

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "bot", text: botText, timestamp: new Date() },
      ]);
    } catch (err: unknown) {
      console.error("[HarshBot] Error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Error: ${msg.slice(0, 150)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatText = (text: string) => {
    return text
      // Bold **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // List items starting with * or - -> clean bullet dot "• "
      .replace(/^[\*\-]\s+/gm, "• ")
      .replace(/\n[\*\-]\s+/g, "\n• ")
      // Italic *text* -> <em>text</em>
      .replace(/(^|[^\*])\*([^*\n]+?)\*/g, "$1<em>$2</em>")
      // Remove any lingering stray asterisks so no * symbols display
      .replace(/\*/g, "")
      // Preserve newlines as breaks
      .replace(/\n/g, "<br/>");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
          boxShadow: "0 0 24px 4px rgba(124, 58, 237, 0.45)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Toggle HarshBot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring */}
      {!open && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full pointer-events-none"
          style={{ border: "2px solid rgba(124,58,237,0.5)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-3rem)] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0f0f1a 0%, #13132a 100%)",
              border: "1px solid rgba(124,58,237,0.35)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.2)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(90deg, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.2) 100%)",
                borderBottom: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
                  >
                    <Bot size={18} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f0f1a]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">HarshBot</p>
                  <p className="text-violet-300 text-xs mt-0.5 flex items-center gap-1">
                    <Sparkles size={10} /> Powered by Gemini AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "bot"
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600"
                        : "bg-gradient-to-br from-slate-600 to-slate-700"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot size={14} className="text-white" />
                    ) : (
                      <User size={14} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" ? "text-white rounded-tr-sm" : "text-slate-200 rounded-tl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }
                        : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }
                    }
                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                  />
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div
                    className="px-4 py-2.5 rounded-2xl rounded-tl-sm"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 text-center px-2 py-1.5 bg-red-900/20 rounded-lg border border-red-800/30 break-words"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1 rounded-full text-violet-300 border border-violet-700/50 hover:border-violet-500 hover:bg-violet-900/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Harshith..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  disabled={loading}
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
                >
                  <Send size={14} className="text-white" />
                </motion.button>
              </div>
              <p className="text-center text-slate-500 text-[10px] mt-2">HarshBot · Powered by Gemini AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
