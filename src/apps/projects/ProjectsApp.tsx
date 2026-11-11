import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  FileCode2,
  Folder,
  FolderOpen,
  Github,
  Brain,
  Globe,
  LayoutGrid,
  List,
  Rocket,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { categories, findProject, projects, type Project, type ProjectCategory } from '../../data/projects';
import { useSettings } from '../../store/settingsStore';
import type { AppProps } from '../registry';

const folderIcons: Record<ProjectCategory, LucideIcon> = { Web: Globe, 'AI/ML': Brain, IoT: Cpu, Startups: Rocket };

type Location = { folder: ProjectCategory | 'All' | null; projectId: string | null };

/** File Explorer: folders by category → project files → detail view. */
export default function ProjectsApp({ payload }: AppProps) {
  const [loc, setLoc] = useState<Location>({ folder: null, projectId: null });
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [query, setQuery] = useState('');

  // Opened from Start search / Terminal / Achievements with a specific project
  useEffect(() => {
    const target = findProject((payload?.projectId as string | undefined) ?? '');
    if (target) {
      setQuery('');
      setLoc({ folder: target.categories[0], projectId: target.id });
    }
  }, [payload]);

  const project = loc.projectId ? findProject(loc.projectId) : undefined;

  const listed = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = loc.folder && loc.folder !== 'All' ? projects.filter((p) => p.categories.includes(loc.folder as ProjectCategory)) : projects;
    if (q) items = projects.filter((p) => `${p.title} ${p.tagline} ${p.tech.join(' ')}`.toLowerCase().includes(q));
    return items;
  }, [loc.folder, query]);

  const showFolders = !loc.folder && !query;
  const open = (p: Project) => setLoc((l) => ({ folder: l.folder ?? 'All', projectId: p.id }));
  const goUp = () => setLoc((l) => (l.projectId ? { ...l, projectId: null } : { folder: null, projectId: null }));

  const crumbs = ['Projects', ...(query ? [`Search “${query}”`] : loc.folder ? [loc.folder === 'All' ? 'All projects' : loc.folder] : []), ...(project ? [project.title] : [])];

  return (
    <div className="flex h-full min-h-[420px] flex-col">
      {/* Toolbar */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-line/10 px-3 py-2">
        <button type="button" onClick={goUp} disabled={!loc.folder && !loc.projectId} className="btn !h-8 !w-8 !p-0" aria-label="Up one level">
          <ArrowLeft size={15} />
        </button>
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1 rounded-lg bg-line/5 px-3 py-1.5 text-[13px]">
          <FolderOpen size={14} className="shrink-0 text-accent" aria-hidden="true" />
          {crumbs.map((c, i) => (
            <span key={c} className="flex min-w-0 items-center gap-1">
              {i > 0 && <ChevronRight size={13} className="shrink-0 text-muted" aria-hidden="true" />}
              {i === 0 && (loc.folder || query) ? (
                <button
                  type="button"
                  className="truncate hover:text-accent"
                  onClick={() => {
                    setQuery('');
                    setLoc({ folder: null, projectId: null });
                  }}
                >
                  {c}
                </button>
              ) : (
                <span className={`truncate ${i === crumbs.length - 1 ? 'font-medium' : ''}`}>{c}</span>
              )}
            </span>
          ))}
        </nav>
        <label className="relative w-full @xl:w-52">
          <span className="sr-only">Search projects</span>
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLoc((l) => ({ ...l, projectId: null }));
            }}
            placeholder="Search projects"
            className="input !h-8 !pl-8 text-[13px]"
          />
        </label>
        {!project && (
          <div className="hidden overflow-hidden rounded-lg border border-line/10 @xl:flex" role="group" aria-label="View">
            <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} className={`grid h-8 w-8 place-items-center ${view === 'grid' ? 'bg-accent/20 text-accent' : 'hover:bg-line/10'}`} aria-label="Grid view">
              <LayoutGrid size={14} />
            </button>
            <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={`grid h-8 w-8 place-items-center ${view === 'list' ? 'bg-accent/20 text-accent' : 'hover:bg-line/10'}`} aria-label="List view">
              <List size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-48 shrink-0 border-r border-line/10 p-2 @3xl:block" aria-label="Folders">
          <p className="eyebrow px-2 pb-1 pt-2">Quick access</p>
          {(['All', ...categories.map((c) => c.id)] as const).map((f) => {
            const Icon = f === 'All' ? FolderOpen : folderIcons[f];
            const count = f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
            const activeFolder = !query && loc.folder === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setQuery('');
                  setLoc({ folder: f, projectId: null });
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] ${activeFolder ? 'bg-accent/15 text-fg' : 'text-fg/80 hover:bg-line/[0.07]'}`}
              >
                <Icon size={15} className="text-accent" aria-hidden="true" />
                <span className="flex-1">{f === 'All' ? 'All projects' : f}</span>
                <span className="text-[11px] text-muted">{count}</span>
              </button>
            );
          })}
        </aside>

        {/* Main pane */}
        <div className="min-w-0 flex-1 overflow-y-auto p-4">
          {project ? (
            <ProjectDetail project={project} />
          ) : showFolders ? (
            <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3 @4xl:grid-cols-4">
              {categories.map((c) => {
                const count = projects.filter((p) => p.categories.includes(c.id)).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onDoubleClick={() => setLoc({ folder: c.id, projectId: null })}
                    onClick={() => setLoc({ folder: c.id, projectId: null })}
                    className="flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-colors hover:bg-line/[0.07]"
                  >
                    <Folder size={56} strokeWidth={1.4} className="fill-accent/25 text-accent" aria-hidden="true" />
                    <span className="text-[13.5px] font-medium">{c.id}</span>
                    <span className="text-[12px] text-muted">
                      {count} item{count === 1 ? '' : 's'} · {c.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : listed.length === 0 ? (
            <p className="py-16 text-center text-muted">No projects match “{query}”.</p>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
              {listed.map((p) => (
                <ProjectTile key={p.id} project={p} onOpen={() => open(p)} />
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-[13px]">
              <thead className="text-[12px] text-muted">
                <tr>
                  <th className="py-2 font-medium">Name</th>
                  <th className="hidden py-2 font-medium @xl:table-cell">Category</th>
                  <th className="hidden py-2 font-medium @4xl:table-cell">Tech</th>
                </tr>
              </thead>
              <tbody>
                {listed.map((p) => (
                  <tr key={p.id} className="border-t border-line/[0.07] hover:bg-line/[0.05]">
                    <td className="py-2">
                      <button type="button" onClick={() => open(p)} className="flex items-center gap-2 font-medium hover:text-accent">
                        <FileCode2 size={15} className="text-accent" aria-hidden="true" /> {p.title}
                      </button>
                    </td>
                    <td className="hidden py-2 text-muted @xl:table-cell">{p.categories.join(', ')}</td>
                    <td className="hidden truncate py-2 text-muted @4xl:table-cell">{p.tech.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-line/10 px-4 py-1.5 text-[12px] text-muted">
        {project ? project.title : showFolders ? `${categories.length} folders` : `${listed.length} item${listed.length === 1 ? '' : 's'}`}
      </div>
    </div>
  );
}

function Thumb({ project, className = '' }: { project: Project; className?: string }) {
  const theme = useSettings((s) => s.theme);
  const shot = project.screenshots[0];
  if (shot) {
    return <img src={theme === 'light' && shot.light ? shot.light : shot.dark} alt="" loading="lazy" className={`object-cover [image-rendering:pixelated] ${className}`} />;
  }
  // No screenshot yet: a clean generated cover instead of a fake image
  return (
    <div
      className={`grid place-items-center ${className}`}
      style={{ background: 'linear-gradient(135deg, rgb(var(--accent) / .35), rgb(var(--accent) / .08))' }}
      aria-hidden="true"
    >
      <span className="text-2xl font-bold tracking-tight text-fg/80">{project.title}</span>
    </div>
  );
}

function ProjectTile({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="card group overflow-hidden text-left transition-transform hover:-translate-y-0.5 hover:border-accent/40">
      <Thumb project={project} className="aspect-[16/9] w-full" />
      <div className="p-3.5">
        <p className="font-semibold group-hover:text-accent">{project.title}</p>
        <p className="mt-0.5 line-clamp-2 text-[12.5px] text-muted">{project.tagline}</p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.categories.map((c) => (
            <span key={c} className="chip chip-accent !h-5 !text-[11px]">
              {c}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const theme = useSettings((s) => s.theme);
  return (
    <article className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl ring-1 ring-line/10">
        <Thumb project={project} className="aspect-[21/9] w-full" />
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <span key={c} className="chip chip-accent">
                {c}
              </span>
            ))}
            {project.role && <span className="chip">{project.role}</span>}
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h2>
          <p className="text-muted">{project.tagline}</p>
        </div>
        <div className="flex gap-2">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="btn btn-primary">
              Live site <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="btn">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-[14.5px] leading-relaxed text-fg/85">{project.description}</p>

      {project.highlights && (
        <section className="mt-5">
          <h3 className="eyebrow mb-2">Highlights</h3>
          <ul className="grid gap-1.5 @xl:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[13.5px]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-5">
        <h3 className="eyebrow mb-2">Tech stack</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="eyebrow mb-2">Screenshots</h3>
        {project.screenshots.length ? (
          <div className="grid gap-3 @xl:grid-cols-2">
            {project.screenshots.map((s) => (
              <img
                key={s.dark}
                src={theme === 'light' && s.light ? s.light : s.dark}
                alt={s.alt}
                loading="lazy"
                className="w-full rounded-xl object-cover ring-1 ring-line/10 [image-rendering:pixelated]"
              />
            ))}
          </div>
        ) : (
          <p className="card px-4 py-6 text-center text-[13px] text-muted">Screenshots coming soon.</p>
        )}
      </section>
    </article>
  );
}
