import { ExternalLink, Github, Linkedin, Mail, MapPin, Monitor } from 'lucide-react';
import { achievements, profile, webro } from '../data/profile';
import { projects } from '../data/projects';

/**
 * Plain, scrollable portfolio for recruiters, screen readers and anyone who
 * just wants the facts. Same content as GauravOS, no window manager.
 */
export default function SimpleView() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <header className="border-b border-line/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <span className="font-semibold">{profile.name}</span>
          <a href="/" className="btn !h-9">
            <Monitor size={15} aria-hidden="true" /> Open GauravOS
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-5 py-12">
        {/* Intro */}
        <section aria-labelledby="intro" className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img src={profile.portrait.dark} alt={profile.name} className="h-24 w-24 rounded-2xl object-cover ring-1 ring-line/10 [image-rendering:pixelated]" width={96} height={96} />
          <div>
            <h1 id="intro" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-lg text-muted">{profile.headline}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} aria-hidden="true" /> {profile.location}
            </p>
          </div>
        </section>
        <div className="mt-6 flex flex-wrap gap-2">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <Mail size={15} aria-hidden="true" /> Email me
          </a>
          <a className="btn" href={profile.socials.github} target="_blank" rel="noreferrer">
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
          <a className="btn" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={15} aria-hidden="true" /> LinkedIn
          </a>
        </div>

        <Section title="About">
          {profile.intro.map((p) => (
            <p key={p} className="mb-3 leading-relaxed text-fg/85">
              {p}
            </p>
          ))}
        </Section>

        <Section title="Roles">
          <ul className="space-y-2">
            {profile.roles.map((r) => (
              <li key={r.org}>
                <span className="font-medium">{r.title}</span> — {r.org}
                {'note' in r && r.note && <span className="text-muted"> ({r.note})</span>}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="space-y-3">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <p className="font-medium">{e.degree}</p>
                <p className="text-sm text-muted">
                  {e.school} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Projects">
          <ul className="space-y-6">
            {projects.map((p) => (
              <li key={p.id}>
                <h3 className="text-lg font-semibold">
                  {p.title} <span className="text-sm font-normal text-muted">· {p.categories.join(', ')}</span>
                </h3>
                <p className="mt-1 leading-relaxed text-fg/85">{p.description}</p>
                <p className="mt-2 text-sm text-muted">{p.tech.join(' · ')}</p>
                {p.links.live && (
                  <a href={p.links.live} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline">
                    Live site <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Achievements">
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a.id}>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={webro.name}>
          <p className="leading-relaxed text-fg/85">
            {webro.tagline} {webro.founder}. {webro.stat}.
          </p>
          <a href={webro.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-accent hover:underline">
            webrostudios.space <ExternalLink size={13} aria-hidden="true" />
          </a>
        </Section>

        <Section title="Skills">
          <dl className="space-y-2">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group} className="sm:flex sm:gap-3">
                <dt className="w-32 shrink-0 font-medium">{group}</dt>
                <dd className="text-fg/85">{items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Contact">
          <p>
            Email:{' '}
            <a className="text-accent hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
          <p className="mt-1">
            Website:{' '}
            <a className="text-accent hover:underline" href={profile.website}>
              gauravdeori.in
            </a>
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-line/10 pt-8" aria-label={title}>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
