import { useEffect, useState } from 'react';
import { Download, ExternalLink, FileText, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { achievements, profile } from '../../data/profile';
import { projects } from '../../data/projects';

/**
 * PDF-viewer style window. If public/resume.pdf exists it's embedded and
 * downloadable; otherwise a resume generated from the data files is shown,
 * with "Save as PDF" via the browser's print dialog.
 */
export default function ResumeApp() {
  const [pdf, setPdf] = useState<'checking' | 'yes' | 'no'>('checking');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let alive = true;
    fetch(profile.resumePdf, { method: 'HEAD' })
      .then((r) => alive && setPdf(r.ok && (r.headers.get('content-type') ?? '').includes('pdf') ? 'yes' : 'no'))
      .catch(() => alive && setPdf('no'));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex h-full min-h-[480px] flex-col bg-line/[0.04]">
      {/* Viewer toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-line/10 bg-glass-2/50 px-3 py-2">
        <FileText size={16} className="text-accent" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium">Gaurav_Deori_Resume.pdf</span>
        {pdf === 'no' && (
          <div className="hidden items-center gap-1 @lg:flex">
            <button type="button" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(1)))} className="btn !h-8 !w-8 !p-0" aria-label="Zoom out">
              <ZoomOut size={14} />
            </button>
            <span className="w-12 text-center text-[12px] tabular-nums text-muted">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.1).toFixed(1)))} className="btn !h-8 !w-8 !p-0" aria-label="Zoom in">
              <ZoomIn size={14} />
            </button>
          </div>
        )}
        {pdf === 'yes' ? (
          <>
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="btn !h-8 text-[12px]">
              <ExternalLink size={13} aria-hidden="true" /> <span className="hidden @md:inline">Open</span>
            </a>
            <a href={profile.resumePdf} download="Gaurav_Deori_Resume.pdf" className="btn btn-primary !h-8 text-[12px]">
              <Download size={13} aria-hidden="true" /> Download
            </a>
          </>
        ) : (
          <button type="button" onClick={() => window.print()} className="btn btn-primary !h-8 text-[12px]" disabled={pdf === 'checking'}>
            <Printer size={13} aria-hidden="true" /> Save as PDF
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {pdf === 'yes' ? (
          <iframe src={`${profile.resumePdf}#view=FitH`} title="Gaurav Deori resume" className="h-full w-full" />
        ) : pdf === 'no' ? (
          <div className="p-4 @xl:p-8">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
              <ResumeDocument />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A clean one-page resume built from data/profile.ts and data/projects.ts. */
function ResumeDocument() {
  return (
    <article
      id="resume-doc"
      className="mx-auto w-full max-w-[720px] rounded-sm bg-white p-8 text-[12.5px] leading-relaxed text-neutral-800 shadow-xl @xl:p-12"
    >
      <header className="border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-bold text-neutral-900">{profile.name}</h1>
        <p className="text-neutral-600">{profile.headline}</p>
        <p className="mt-1 text-[11.5px] text-neutral-500">
          {profile.location} · {profile.email} · github.com/Gauravdeori · gauravdeori.in
        </p>
      </header>

      <ResumeSection title="Education">
        {profile.education.map((e) => (
          <div key={e.degree} className="mb-1.5 flex justify-between gap-4">
            <span>
              <strong className="text-neutral-900">{e.degree}</strong>, {e.school}
            </span>
            <span className="shrink-0 text-neutral-500">{e.period}</span>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Roles">
        <ul className="list-disc space-y-0.5 pl-4">
          {profile.roles.map((r) => (
            <li key={r.org}>
              <strong className="text-neutral-900">{r.title}</strong>, {r.org}
              {'note' in r && r.note ? ` — ${r.note}` : ''}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Projects">
        {projects.map((p) => (
          <div key={p.id} className="mb-2">
            <strong className="text-neutral-900">{p.title}</strong> — {p.tagline}
            <p className="text-neutral-600">{p.tech.join(' · ')}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Achievements">
        <ul className="list-disc space-y-0.5 pl-4">
          {achievements.map((a) => (
            <li key={a.id}>
              <strong className="text-neutral-900">{a.title}</strong> — {a.detail}
            </li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Skills">
        {Object.entries(profile.skills).map(([g, items]) => (
          <p key={g}>
            <strong className="text-neutral-900">{g}:</strong> {items.join(', ')}
          </p>
        ))}
      </ResumeSection>
    </article>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-500">{title}</h2>
      {children}
    </section>
  );
}
