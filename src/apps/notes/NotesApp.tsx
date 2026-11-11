import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  body: string;
}

const KEY = 'gauravos-notes';

const WELCOME: Note = {
  id: 'welcome',
  title: 'Welcome to GauravOS 👋',
  body: `Hey, thanks for stopping by!

I'm Gaurav — a B.Tech CSE student at DUIET who loves building things: websites, IoT gadgets, AI tools and small startups.

A few things to try:
• Double-click any desktop icon to open an app
• Open Projects to browse my work like files
• Run "neofetch" or "sudo hire-gaurav" in the Terminal
• Right-click the desktop to change the wallpaper
• Press Ctrl+K to search everything

Notes you write here stay in your browser. Have fun exploring!`,
};

function load(): Note[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    /* fall through */
  }
  return [WELCOME];
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(load);
  const [activeId, setActiveId] = useState(notes[0]?.id);
  const active = notes.find((n) => n.id === activeId) ?? notes[0];

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(notes));
    } catch {
      /* storage full or blocked — notes stay for this session */
    }
  }, [notes]);

  const update = (patch: Partial<Note>) => setNotes((ns) => ns.map((n) => (n.id === active.id ? { ...n, ...patch } : n)));

  const add = () => {
    const note = { id: crypto.randomUUID?.() ?? String(Date.now()), title: 'Untitled note', body: '' };
    setNotes((ns) => [note, ...ns]);
    setActiveId(note.id);
  };

  const remove = () => {
    const rest = notes.filter((n) => n.id !== active.id);
    const next = rest.length ? rest : [WELCOME];
    setNotes(next);
    setActiveId(next[0].id);
  };

  return (
    <div className="flex h-full min-h-[360px]">
      <aside className="hidden w-52 shrink-0 flex-col border-r border-line/10 @xl:flex" aria-label="Notes">
        <div className="flex items-center justify-between p-3">
          <span className="eyebrow">Notes</span>
          <button type="button" onClick={add} className="btn !h-7 !w-7 !p-0" aria-label="New note">
            <Plus size={14} />
          </button>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
          {notes.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setActiveId(n.id)}
                className={`w-full rounded-lg px-3 py-2 text-left ${n.id === active.id ? 'bg-accent/15' : 'hover:bg-line/[0.07]'}`}
              >
                <span className="block truncate text-[13px] font-medium">{n.title || 'Untitled'}</span>
                <span className="block truncate text-[12px] text-muted">{n.body.split('\n').find(Boolean) ?? 'Empty'}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line/10 px-4 py-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Note title</span>
            <input value={active.title} onChange={(e) => update({ title: e.target.value })} className="w-full bg-transparent text-[16px] font-semibold outline-none" />
          </label>
          <button type="button" onClick={add} className="btn !h-8 !w-8 !p-0 @xl:hidden" aria-label="New note">
            <Plus size={14} />
          </button>
          <button type="button" onClick={remove} className="btn !h-8 !w-8 !p-0" aria-label="Delete note">
            <Trash2 size={14} />
          </button>
        </div>
        <label className="min-h-0 flex-1">
          <span className="sr-only">Note text</span>
          <textarea
            value={active.body}
            onChange={(e) => update({ body: e.target.value })}
            className="h-full min-h-[260px] w-full resize-none bg-transparent p-4 text-[14px] leading-relaxed outline-none"
            placeholder="Start typing…"
          />
        </label>
      </section>
    </div>
  );
}
