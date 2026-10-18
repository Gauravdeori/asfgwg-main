import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const ChatBot: React.FC = () => {
  const { bot } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [robotSpeech, setRobotSpeech] = useState('Chat with me! 💬');
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Mouse cursor tracking for robot pupils
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - (window.innerWidth - 60)) / 120;
      const ry = (e.clientY - (window.innerHeight - 60)) / 120;
      setEyeOffset({
        x: Math.max(-1, Math.min(1, rx)),
        y: Math.max(-1, Math.min(1, ry)),
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: bot.greeting,
      timestamp: 'NOW'
    },
    {
      id: 'init-2',
      sender: 'bot',
      text: bot.questions[0].question,
      timestamp: 'NOW'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Dynamic robot launcher speech bubbles
  useEffect(() => {
    const bubbles = [
      'Chat with me! 💬',
      'Ask about PresentIQ 🚀',
      'Need a website? 💻',
      'Hackathon 1st Place 🏆',
      'Let\'s build together 🤝'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % bubbles.length;
      setRobotSpeech(bubbles[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Check if it's one of the questionnaire steps
    if (!isComplete && stepIndex < bot.questions.length) {
      const currentField = bot.questions[stepIndex].field;
      const updatedForm = { ...formData, [currentField]: text };
      setFormData(updatedForm);

      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);

      setTimeout(() => {
        setIsTyping(false);
        if (nextStep < bot.questions.length) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: bot.questions[nextStep].question,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setIsComplete(true);
          const summary = `📋 PROJECT BRIEF CONFIRMED:\n\n• Name: ${updatedForm.name}\n• Email: ${updatedForm.email}\n• Project: ${updatedForm.project}\n• Budget: ${updatedForm.budget}\n• Timeline: ${updatedForm.timeline}\n\nGaurav has received your request and will follow up shortly! 🚀`;
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: summary,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      }, 700);
      return;
    }

    // Otherwise FAQ check or generic response
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = "I've noted that! Feel free to ask about Gaurav's skills, hackathons, projects, or use the email button above to connect.";

      for (const faq of bot.quickPrompts) {
        if (lower.includes(faq.label.toLowerCase().slice(0, 8))) {
          reply = faq.answer;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const handleQuickPrompt = (prompt: { label: string; answer: string }) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: prompt.label,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: prompt.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 500);
  };

  const handleRestart = () => {
    setStepIndex(0);
    setFormData({});
    setIsComplete(false);
    setMessages([
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: bot.questions[0].question,
        timestamp: 'NOW'
      }
    ]);
  };

  return (
    <>
      {/* Floating Retro Robot Launcher Badge */}
      <div className="fixed bottom-5 right-5 sm:right-7 z-40 flex items-center gap-3">
        {/* Floating Speech Bubble */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-1.5 border border-border bg-surface px-3 py-1.5 shadow-pixel text-text font-mono text-[11px] cursor-pointer hover:border-border-strong select-none animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span className="w-1.5 h-1.5 bg-highlight inline-block" />
            <span>{robotSpeech}</span>
          </div>
        )}

        {/* Square Pixel Robot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open assistant chat bot"
          title="Open Gaurav's Assistant Bot"
          className="w-12 h-12 border-2 border-border-strong bg-surface hover:bg-surface-2 flex items-center justify-center text-text shadow-pixel-lg hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
        >
          {/* Pixel Robot Icon */}
          <svg
            className="w-7 h-7 text-accent pixelated"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Antenna */}
            <rect x="11" y="1" width="2" height="3" />
            <rect x="10" y="1" width="4" height="1" />
            {/* Head */}
            <rect x="4" y="4" width="16" height="12" />
            {/* Eyes (dark hollows) */}
            <rect x="7" y="7" width="3" height="3" fill="var(--bg)" />
            <rect x="14" y="7" width="3" height="3" fill="var(--bg)" />
            {/* Eye pupils (follow cursor slightly) */}
            <rect x={7.8 + eyeOffset.x} y={7.8 + eyeOffset.y} width="1.4" height="1.4" fill="var(--highlight)" />
            <rect x={14.8 + eyeOffset.x} y={7.8 + eyeOffset.y} width="1.4" height="1.4" fill="var(--highlight)" />
            {/* Mouth */}
            <rect x="8" y="12" width="8" height="2" fill="var(--bg)" />
            <rect x="9" y="12" width="1" height="2" fill="currentColor" />
            <rect x="11" y="12" width="1" height="2" fill="currentColor" />
            <rect x="13" y="12" width="1" height="2" fill="currentColor" />
            {/* Neck / base */}
            <rect x="7" y="17" width="10" height="3" />
            <rect x="5" y="20" width="14" height="2" />
          </svg>

          {/* Online green indicator dot */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border border-border" />
        </button>
      </div>

      {/* Terminal Assistant Modal Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-7 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] z-50 flex flex-col border-2 border-border-strong bg-surface shadow-pixel-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Terminal Window Titlebar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface-2 border-b border-border select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 inline-block animate-pulse" />
              <span className="font-pixel text-[11px] font-bold tracking-wider text-text">
                {bot.name}
              </span>
              <span className="font-mono text-[9.5px] text-text-muted">
                [{bot.version}]
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Minimize"
                className="w-5 h-5 border border-border bg-surface hover:bg-surface-2 text-text text-xs flex items-center justify-center font-mono"
              >
                _
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="w-5 h-5 border border-border bg-surface hover:bg-highlight hover:text-white text-text text-xs flex items-center justify-center font-mono"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[380px] bg-bg/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[9px] font-mono text-text-muted mb-0.5 uppercase tracking-wider">
                  {msg.sender === 'user' ? 'YOU' : 'GAURAV.AI'}
                </div>
                <div
                  className={`max-w-[85%] px-3 py-2 text-xs font-mono leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-accent text-accent-ink border border-border font-medium'
                      : 'bg-surface border border-border text-text shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 bg-surface border border-border px-3 py-1.5 self-start w-fit text-text-muted font-mono text-xs">
                <span>bot is typing</span>
                <span className="cursor-blink">...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Prompts Chips */}
          <div className="px-3 py-2 border-t border-border bg-surface/90 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {bot.quickPrompts.map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => handleQuickPrompt(prompt)}
                className="flex-shrink-0 border border-border bg-surface-2 hover:border-border-strong hover:bg-surface text-text font-mono text-[10px] px-2 py-1 select-none transition-colors"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Bottom Actions & Input */}
          <div className="p-3 border-t border-border bg-surface">
            {isComplete ? (
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:deorigaurav1400@gmail.com?subject=Project Inquiry from ${encodeURIComponent(
                    formData.name || 'Client'
                  )}&body=${encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}`
                  )}`}
                  className="pixel-btn-primary w-full py-2 text-xs text-center font-mono font-bold"
                >
                  ✉ SEND BRIEF VIA EMAIL
                </a>
                <button
                  onClick={handleRestart}
                  className="pixel-btn-outline w-full py-1.5 text-xs font-mono text-center"
                >
                  ↻ START NEW QUESTIONNAIRE
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-text-muted text-xs select-none">
                    &gt;
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type response or question..."
                    maxLength={300}
                    className="w-full bg-surface-2 border border-border pl-6 pr-3 py-2 text-xs font-mono text-text placeholder:text-text-muted focus:border-border-strong focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="pixel-btn-primary px-3.5 py-2 text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed select-none"
                >
                  SEND
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
