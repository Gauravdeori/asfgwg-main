import { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Lock, RotateCw, Star, X } from 'lucide-react';
import { profile, webro } from '../../data/profile';
import { openApp } from '../../store/windowStore';

/**
 * A mini browser "visiting" Webro Studios. The page is rendered here (an
 * iframe of the real site may be blocked by its headers); the button opens
 * the live site in a real tab.
 */
export default function WebroApp() {
  const [reloadKey, setReloadKey] = useState(0);
  const host = webro.url.replace(/^https?:\/\//, '');

  return (
    <div className="flex h-full min-h-[460px] flex-col">
      {/* Tab strip */}
      <div className="flex shrink-0 items-end gap-1 bg-line/[0.05] px-2 pt-2">
        <div className="flex h-8 max-w-[220px] items-center gap-2 rounded-t-lg bg-glass-2/60 px-3 text-[12px]">
          <Globe size={13} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate">{webro.name}</span>
          <X size={12} className="shrink-0 text-muted" aria-hidden="true" />
        </div>
      </div>

      {/* Address bar */}
      <div className="flex shrink-0 items-center gap-1 border-b border-line/10 bg-glass-2/60 px-2 py-1.5">
        <span className="grid h-8 w-8 place-items-center text-muted/60" aria-hidden="true">
          <ArrowLeft size={15} />
        </span>
        <span className="grid h-8 w-8 place-items-center text-muted/60" aria-hidden="true">
          <ArrowRight size={15} />
        </span>
        <button type="button" onClick={() => setReloadKey((k) => k + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-line/10" aria-label="Reload page">
          <RotateCw size={14} />
        </button>
        <div className="mx-1 flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-line/[0.07] px-3 text-[13px]">
          <Lock size={12} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="truncate">
            <span className="text-muted">https://</span>
            {host}
          </span>
          <Star size={13} className="ml-auto shrink-0 text-muted" aria-hidden="true" />
        </div>
        <a href={webro.url} target="_blank" rel="noreferrer" className="btn !h-8 text-[12px]">
          Open site <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>

      {/* "Web page" */}
      <div key={reloadKey} className="min-h-0 flex-1 overflow-y-auto bg-[#0b0b12] text-white">
        <header className="flex items-center justify-between px-6 py-4">
          <span className="text-[15px] font-bold tracking-tight">
            webro<span className="text-accent">.</span>studios
          </span>
          <nav className="hidden gap-5 text-[13px] text-white/70 @xl:flex" aria-label="Site sections">
            <span>Services</span>
            <span>Work</span>
            <span>Contact</span>
          </nav>
        </header>

        <section className="relative overflow-hidden px-6 pb-14 pt-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'rgb(var(--accent) / .45)' }}
            aria-hidden="true"
          />
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">Web development agency</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight @xl:text-4xl">We build fast, modern websites that work for your business.</h2>
          <p className="mt-4 max-w-lg text-[15px] text-white/70">{webro.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={webro.url} target="_blank" rel="noreferrer" className="btn btn-primary">
              Visit webrostudios.space <ExternalLink size={14} aria-hidden="true" />
            </a>
            <button type="button" onClick={() => openApp('mail', { subject: 'Project enquiry via Webro Studios' })} className="btn !border-white/15 !bg-white/10 !text-white">
              Start a project
            </button>
          </div>
          <p className="mt-6 text-[13px] text-white/55">
            {webro.founder} · {webro.stat}
          </p>
        </section>

        <section className="px-6 py-10" aria-labelledby="webro-services">
          <h3 id="webro-services" className="text-lg font-semibold">
            Services
          </h3>
          <div className="mt-4 grid gap-3 @2xl:grid-cols-3">
            {webro.services.map((s) => (
              <div key={s.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-medium">{s.title}</p>
                <p className="mt-1 text-[13px] text-white/65">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-12" aria-labelledby="webro-work">
          <h3 id="webro-work" className="text-lg font-semibold">
            Client work
          </h3>
          <div className="mt-4 grid gap-3 @xl:grid-cols-2">
            {webro.clientWork.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => openApp('projects', { projectId: c.projectId })}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition-colors hover:border-accent/50"
              >
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-[13px] text-white/65">{c.body}</p>
                <p className="mt-2 text-[12px] text-accent">View case in Projects →</p>
              </button>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-5 text-[12px] text-white/45">
          © {new Date().getFullYear()} {webro.name} · {profile.location}
        </footer>
      </div>
    </div>
  );
}
