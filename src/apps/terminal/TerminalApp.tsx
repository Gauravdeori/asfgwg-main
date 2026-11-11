import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { commands, complete, type CommandContext, type Line } from './commands';

type Entry = { kind: 'input'; text: string } | ({ kind: 'output' } & Line);

const toneClass: Record<NonNullable<Line['tone']>, string> = {
  out: 'text-white/85',
  muted: 'text-white/45',
  accent: 'text-accent',
  error: 'text-rose-400',
  success: 'text-emerald-400',
};

const PROMPT_USER = `${profile.handle}@gauravos`;

function Prompt() {
  return (
    <span className="shrink-0">
      <span className="text-emerald-400">{PROMPT_USER}</span>
      <span className="text-white/50">:</span>
      <span className="text-accent">~</span>
      <span className="text-white/50">$</span>{' '}
    </span>
  );
}

/** A small working shell. Always dark, like a real terminal. */
export default function TerminalApp() {
  const [entries, setEntries] = useState<Entry[]>([
    { kind: 'output', text: 'GauravOS terminal — gsh 1.0', tone: 'accent' },
    { kind: 'output', text: "Type 'help' to see what you can do. Try 'neofetch' or 'sudo hire-gaurav'.", tone: 'muted' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const history = useRef<string[]>([]);
  const histIndex = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll only the terminal itself (scrollIntoView would also scroll the window frame)
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);
  useEffect(() => inputRef.current?.focus(), []);

  const ctx: CommandContext = {
    print: (lines) =>
      setEntries((e) => [...e, ...(typeof lines === 'string' ? [{ text: lines }] : lines).map((l) => ({ kind: 'output' as const, ...l }))]),
    clear: () => setEntries([]),
    printSlowly: async (lines, ms = 420) => {
      for (const l of lines) {
        await new Promise((r) => setTimeout(r, ms));
        setEntries((e) => [...e, { kind: 'output', ...l }]);
      }
    },
  };

  const run = async (raw: string) => {
    const text = raw.trim();
    setEntries((e) => [...e, { kind: 'input', text: raw }]);
    if (!text) return;
    history.current = [text, ...history.current.filter((h) => h !== text)].slice(0, 50);
    histIndex.current = -1;
    const [name, ...args] = text.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    if (!cmd) {
      ctx.print([{ text: `gsh: command not found: ${name}. Type 'help' for a list.`, tone: 'error' }]);
      return;
    }
    setBusy(true);
    try {
      await cmd.run(args, ctx);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (busy) return;
      const value = input;
      setInput('');
      void run(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIndex.current + 1, history.current.length - 1);
      if (next >= 0) {
        histIndex.current = next;
        setInput(history.current[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIndex.current - 1;
      histIndex.current = Math.max(next, -1);
      setInput(next >= 0 ? history.current[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const options = complete(input);
      if (options.length === 1) setInput(`${options[0]} `);
      else if (options.length > 1) ctx.print([{ text: options.join('   '), tone: 'muted' }]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      ctx.clear();
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-full min-h-[320px] overflow-y-auto bg-[#0a0a10]/95 p-4 font-mono text-[13px] leading-6 text-white/85"
      onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus()}
    >
      <div role="log" aria-live="polite" aria-label="Terminal output">
        {entries.map((entry, i) =>
          entry.kind === 'input' ? (
            <div key={i} className="flex whitespace-pre-wrap break-words">
              <Prompt />
              <span>{entry.text}</span>
            </div>
          ) : (
            <div key={i} className={`whitespace-pre-wrap break-words ${toneClass[entry.tone ?? 'out']}`}>
              {entry.text || ' '}
            </div>
          ),
        )}
      </div>

      <div className="flex items-center">
        <Prompt />
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          readOnly={busy}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-white caret-accent outline-none"
        />
      </div>
    </div>
  );
}
