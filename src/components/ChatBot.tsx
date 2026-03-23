import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, X, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  field?: string;
}

const STEPS = [
  { field: "name", question: "Hey! 👋 I'm Gaurav's assistant bot. What's your name?" },
  { field: "email", question: "Nice to meet you! What's your email so Gaurav can reach you?" },
  { field: "project", question: "Awesome! Tell me about the project or work you have in mind 💡" },
  { field: "budget", question: "Got it! Do you have a budget range in mind? (e.g. ₹5k-10k, flexible, etc.)" },
  { field: "timeline", question: "Last one — when do you need this done by? ⏰" },
];

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot = ({ isOpen, onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: STEPS[0].question, field: STEPS[0].field },
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const validateInput = (field: string, value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter something!";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "That doesn't look like a valid email. Try again? 📧";
    }
    if (field === "name" && trimmed.length < 2) return "Name's too short!";
    return null;
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isComplete || isSending) return;

    const currentField = STEPS[currentStep]?.field || "";
    const error = validateInput(currentField, trimmed);

    if (error) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: trimmed },
        { role: "bot", text: error },
      ]);
      setInput("");
      return;
    }

    const newFormData = { ...formData, [currentField]: trimmed };
    setFormData(newFormData);

    const nextStep = currentStep + 1;

    if (nextStep < STEPS.length) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: trimmed },
        { role: "bot", text: STEPS[nextStep].question, field: STEPS[nextStep].field },
      ]);
      setCurrentStep(nextStep);
    } else {
      setIsSending(true);
      setMessages((prev) => [
        ...prev,
        { role: "user", text: trimmed },
        { role: "bot", text: "Thanks! Let me put that together... 🤖" },
      ]);

      // Simulate sending & show summary
      setTimeout(() => {
        const summary = `📋 **Project Request Summary**\n\n👤 ${newFormData.name}\n📧 ${newFormData.email}\n💡 ${newFormData.project}\n💰 ${newFormData.budget}\n⏰ ${newFormData.timeline}`;

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Got everything! Here's a summary:\n\n${summary}\n\nGaurav will get back to you soon! 🚀✨`,
          },
        ]);
        setIsComplete(true);
        setIsSending(false);
      }, 1200);
    }

    setInput("");
  };

  const handleRestart = () => {
    setMessages([{ role: "bot", text: STEPS[0].question, field: STEPS[0].field }]);
    setCurrentStep(0);
    setFormData({});
    setIsComplete(false);
    setIsSending(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] z-50 flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 25px 60px -12px hsl(174 72% 56% / 0.25), 0 0 0 1px hsl(174 72% 56% / 0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold text-sm text-foreground">Gaurav's Bot</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[250px] max-h-[400px]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: msg.role === "bot" ? 0.2 : 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isSending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-secondary px-3 py-2 rounded-2xl rounded-bl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border bg-card">
            {isComplete ? (
              <div className="flex gap-2">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-2 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Submit another project 🔄
                </button>
                <a
                  href={`mailto:gauravdeori87@gmail.com?subject=Project Request from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0AProject: ${formData.project}%0ABudget: ${formData.budget}%0ATimeline: ${formData.timeline}`}
                  className="py-2 px-4 rounded-xl bg-secondary text-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Send via Email 📧
                </a>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer..."
                  maxLength={500}
                  className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  disabled={isSending}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
                >
                  <Send size={16} />
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
