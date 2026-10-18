import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Keywords per quick prompt (same order as bot.quickPrompts) so typed questions get real answers
const FAQ_KEYWORDS: string[][] = [
  ['who is', 'about gaurav', 'about you', 'yourself', 'introduce'],
  ['project', 'portfolio', 'built', 'work on', 'presentiq', 'posterzz'],
  ['hackathon', 'win', 'award', 'prize', 'ecobin', 'thigmaminds'],
  ['hire', 'freelance', 'available', 'work with', 'collab', 'cost', 'price', 'rate'],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ChatBot: React.FC = () => {
  const { bot, socials } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [robotSpeech, setRobotSpeech] = useState('Chat with me! 💬');
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Mouse cursor tracking for robot pupils (only meaningful with a real pointer)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
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
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened (desktop only: on touch devices this would pop the keyboard over the chat)
  // and close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.matchMedia('(pointer: fine)').matches
      ? setTimeout(() => inputRef.current?.focus(), 200)
      : undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
    };
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

  const pushBot = (text: string, delay: number) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}-${prev.length}`, sender: 'bot', text, timestamp: now() }
      ]);
    }, delay);
  };

  const findFaq = (text: string) => {
    const lower = text.toLowerCase();
    const idx = FAQ_KEYWORDS.findIndex((words) => words.some((w) => lower.includes(w)));
    return idx >= 0 ? bot.quickPrompts[idx] : undefined;
  };

  // While the brief is in progress, remind the visitor which question is still pending
  const withPendingQuestion = (answer: string) =>
    !isComplete && stepIndex < bot.questions.length
      ? `${answer}\n\n↩ Back to your brief: ${bot.questions[stepIndex].question.replace(/\s*\(.*\)\s*$/, '')}`
      : answer;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: 'user', text, timestamp: now() }]);
    setInputVal('');

    const faq = findFaq(text);
    const inBrief = !isComplete && stepIndex < bot.questions.length;
    const currentField = inBrief ? bot.questions[stepIndex].field : '';
    // A project description may legitimately mention "projects?" - elsewhere an FAQ question isn't an answer
    const isQuestion = Boolean(faq) && text.endsWith('?') && currentField !== 'project';

    // Questionnaire step (unless they asked one of the FAQ questions instead of answering)
    if (inBrief && !isQuestion) {

      if (currentField === 'email' && !EMAIL_RE.test(text)) {
        pushBot("Hmm, that doesn't look like an email address. Could you double-check it? (e.g. name@example.com)", 500);
        return;
      }

      const updatedForm = { ...formData, [currentField]: text };
      setFormData(updatedForm);

      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);

      if (nextStep < bot.questions.length) {
        pushBot(bot.questions[nextStep].question, 700);
      } else {
        setIsComplete(true);
        pushBot(
          `📋 PROJECT BRIEF READY:\n\n• Name: ${updatedForm.name}\n• Email: ${updatedForm.email}\n• Project: ${updatedForm.project}\n• Budget: ${updatedForm.budget}\n• Timeline: ${updatedForm.timeline}\n\nTap "Send brief via email" below and Gaurav will get back to you shortly! 🚀`,
          700
        );
      }
      return;
    }

    // Otherwise FAQ answer or generic response
    pushBot(
      withPendingQuestion(
        faq
          ? faq.answer
          : `Thanks for the message! Ask me about Gaurav's skills, projects or hackathons — or email him directly at ${socials.email}.`
      ),
      600
    );
  };

  const handleQuickPrompt = (prompt: { label: string; answer: string }) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: prompt.label, timestamp: now() }
    ]);
    pushBot(withPendingQuestion(prompt.answer), 500);
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
      {/* Floating Retro Robot Launcher Badge (hidden on mobile while the full-height panel is open) */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-7 z-40 items-center gap-3 ${
          isOpen ? 'hidden sm:flex' : 'flex'
        }`}
      >
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
          aria-label={isOpen ? 'Close assistant chat' : 'Open assistant chat bot'}
          aria-expanded={isOpen}
          title={isOpen ? 'Close chat' : "Open Gaurav's Assistant Bot"}
          className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-border-strong bg-surface hover:bg-surface-2 flex items-center justify-center text-text shadow-pixel-lg hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
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

      {/* Terminal Assistant Modal Window: full-height sheet below the navbar on mobile, floating panel on desktop */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`${bot.name} assistant chat`}
          className="fixed z-50 inset-x-3 top-[4.5rem] bottom-3 sm:inset-x-auto sm:top-auto sm:bottom-20 sm:right-7 sm:w-[410px] sm:max-h-[min(640px,calc(100dvh-7rem))] flex flex-col border-2 border-border-strong bg-surface shadow-pixel-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Terminal Window Titlebar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface-2 border-b border-border select-none flex-shrink-0">
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
                className="w-6 h-6 sm:w-5 sm:h-5 border border-border bg-surface hover:bg-surface-2 text-text text-xs flex items-center justify-center font-mono"
              >
                _
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="w-6 h-6 sm:w-5 sm:h-5 border border-border bg-surface hover:bg-highlight hover:text-white text-text text-xs flex items-center justify-center font-mono"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 sm:min-h-[260px] sm:max-h-[380px] bg-bg/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[9px] font-mono text-text-muted mb-0.5 uppercase tracking-wider">
                  {msg.sender === 'user' ? 'YOU' : bot.name}
                </div>
                <div
                  className={`max-w-[88%] sm:max-w-[85%] px-3 py-2 text-xs font-mono leading-relaxed whitespace-pre-wrap break-words ${
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
              <div className="flex flex-col items-start">
                <div className="text-[9px] font-mono text-text-muted mb-0.5 uppercase tracking-wider">
                  {bot.name}
                </div>
                <div className="flex items-center gap-1 bg-surface border border-border px-3 py-1.5 w-fit text-text-muted font-mono text-xs">
                  <span>typing</span>
                  <span className="cursor-blink">...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Prompts Chips */}
          <div className="px-3 py-2 border-t border-border bg-surface/90 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
            {bot.quickPrompts.map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => handleQuickPrompt(prompt)}
                className="flex-shrink-0 whitespace-nowrap border border-border bg-surface-2 hover:border-border-strong hover:bg-surface text-text font-mono text-[10px] px-2 py-1.5 sm:py-1 select-none transition-colors"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Bottom Actions & Input */}
          <div className="p-3 border-t border-border bg-surface flex-shrink-0">
            {isComplete ? (
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${socials.email}?subject=${encodeURIComponent(
                    `Project Inquiry from ${formData.name || 'Client'}`
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
                <div className="relative flex-1 min-w-0">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-text-muted text-xs select-none">
                    &gt;
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type your reply..."
                    maxLength={300}
                    enterKeyHint="send"
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
