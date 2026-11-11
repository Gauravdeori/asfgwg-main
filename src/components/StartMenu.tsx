import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, LayoutList, Lock, Search } from 'lucide-react';
import { appList, desktopApps, type AppId } from '../apps/meta';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { openApp } from '../store/windowStore';
import AppIcon from './AppIcon';

interface Props {
  onClose: () => void;
  onLock: () => void;
}

type Result =
  | { kind: 'app'; id: AppId; title: string; sub: string }
  | { kind: 'project'; id: string; title: string; sub: string };

const norm = (s: string) => s.toLowerCase();

/** Search across apps and projects. Typing anywhere in the menu filters instantly. */
function search(q: string): Result[] {
  const query = norm(q.trim());
  if (!query) return [];
  const appHits: Result[] = appList
    .filter((a) => norm(`${a.title} ${a.keywords}`).includes(query))
    .map((a) => ({ kind: 'app', id: a.id, title: a.title, sub: 'App' }));
  const projectHits: Result[] = projects
    .filter((p) => norm(`${p.title} ${p.tagline} ${p.tech.join(' ')} ${p.categories.join(' ')}`).includes(query))
    .map((p) => ({ kind: 'project', id: p.id, title: p.title, sub: p.tagline }));
  return [...appHits, ...projectHits];
}

export default function StartMenu({ onClose, onLock }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(query), [query]);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => setSelected(0), [query]);

  const launch = (r: Result) => {
    if (r.kind === 'app') openApp(r.id);
    else openApp('projects', { projectId: r.id });
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      launch(results[selected]);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[68px] top-3 z-[600] flex items-end justify-center">
    <motion.div
      role="dialog"
      aria-label="Start menu"
      data-start-menu
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.14 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      className="glass-strong shadow-window pointer-events-auto flex max-h-[min(640px,100%)] w-[min(620px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl"
      onKeyDown={onKeyDown}
    >
      <div className="p-5 pb-3">
        <label className="relative block">
          <span className="sr-only">Search apps and projects</span>
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps and projects"
            className="input !h-11 rounded-full !pl-10"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="start-results"
            aria-activedescendant={results.length ? `start-result-${selected}` : undefined}
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
        {query ? (
          <ul id="start-results" role="listbox" aria-label="Search results" className="space-y-1">
            {results.length === 0 && <li className="py-8 text-center text-muted">No results for “{query}”</li>}
            {results.map((r, i) => (
              <li
                key={`${r.kind}-${r.id}`}
                id={`start-result-${i}`}
                role="option"
                aria-selected={i === selected}
                onClick={() => launch(r)}
                onMouseEnter={() => setSelected(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${i === selected ? 'bg-accent/15' : ''}`}
              >
                {r.kind === 'app' ? (
                  <AppIcon id={r.id} size={32} />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-line/10">
                    <FolderOpen size={16} aria-hidden="true" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">{r.title}</span>
                  <span className="block truncate text-[12px] text-muted">{r.kind === 'app' ? 'App' : `Project · ${r.sub}`}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h2 className="eyebrow mb-3">Pinned</h2>
            <div className="mb-5 grid grid-cols-4 gap-1 sm:grid-cols-5">
              {desktopApps.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => launch({ kind: 'app', id: a.id, title: a.title, sub: '' })}
                  className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-3 text-[12px] transition-colors hover:bg-line/10"
                >
                  <AppIcon id={a.id} size={36} />
                  <span className="w-full truncate text-center">{a.label}</span>
                </button>
              ))}
            </div>

            <h2 className="eyebrow mb-2">Featured projects</h2>
            <div className="grid gap-1 sm:grid-cols-2">
              {projects.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => launch({ kind: 'project', id: p.id, title: p.title, sub: p.tagline })}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-line/10"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <FolderOpen size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">{p.title}</span>
                    <span className="block truncate text-[12px] text-muted">{p.tagline}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-line/10 bg-line/[0.03] px-5 py-3">
        <img src={profile.portrait.dark} alt="" className="[image-rendering:pixelated] h-9 w-9 rounded-full object-cover ring-1 ring-line/15" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium">{profile.name}</p>
          <p className="truncate text-[12px] text-muted">{profile.headline}</p>
        </div>
        <a href="?view=simple" className="btn !h-9" title="Plain scrollable portfolio">
          <LayoutList size={15} aria-hidden="true" /> <span className="hidden sm:inline">Simple view</span>
        </a>
        <button type="button" onClick={onLock} className="btn !h-9 !w-9 !p-0" aria-label="Lock GauravOS">
          <Lock size={15} />
        </button>
      </div>
    </motion.div>
    </div>
  );
}
