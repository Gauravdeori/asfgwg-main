import { Briefcase, ExternalLink, GraduationCap, Mail, MapPin } from 'lucide-react';
import { profile, stats } from '../../data/profile';
import { useSettings } from '../../store/settingsStore';
import { openApp } from '../../store/windowStore';

export default function AboutApp() {
  const theme = useSettings((s) => s.theme);

  return (
    <div className="mx-auto max-w-4xl p-5 @xl:p-7">
      {/* Header */}
      <section className="flex flex-col gap-6 @xl:flex-row @xl:items-center">
        <img
          src={profile.portrait[theme]}
          alt={`Portrait of ${profile.name}`}
          width={132}
          height={132}
          className="h-32 w-32 shrink-0 rounded-3xl object-cover shadow-lg ring-1 ring-line/10 [image-rendering:pixelated]"
        />
        <div className="min-w-0">
          <p className="eyebrow">About me</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">{profile.name}</h2>
          <p className="mt-1 text-[15px] text-muted">{profile.headline}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin size={14} aria-hidden="true" /> {profile.location}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => openApp('mail')}>
              <Mail size={15} aria-hidden="true" /> Get in touch
            </button>
            <button type="button" className="btn" onClick={() => openApp('projects')}>
              View projects
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mt-7 space-y-3 text-[14.5px] leading-relaxed text-fg/85">
        {profile.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="font-medium text-fg">“{profile.motto}”</p>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 @xl:grid-cols-4" aria-label="Highlights">
        {stats.map((s) => (
          <div key={s.label} className="card px-4 py-3">
            <p className="text-2xl font-bold text-accent">{s.value}</p>
            <p className="text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-4 @3xl:grid-cols-2">
        {/* Education */}
        <section className="card p-5">
          <h3 className="mb-4 flex items-center gap-2 text-[15px] font-semibold">
            <GraduationCap size={17} className="text-accent" aria-hidden="true" /> Education
          </h3>
          <ul className="space-y-4">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <p className="font-medium">{e.degree}</p>
                <p className="text-[13px] text-muted">
                  {e.school} · {e.period}
                </p>
                {e.note && <p className="mt-1 text-[12.5px] text-muted">{e.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        {/* Roles */}
        <section className="card p-5">
          <h3 className="mb-4 flex items-center gap-2 text-[15px] font-semibold">
            <Briefcase size={17} className="text-accent" aria-hidden="true" /> Roles
          </h3>
          <ul className="space-y-3">
            {profile.roles.map((r) => (
              <li key={r.org} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-medium">{r.title}</p>
                  <p className="text-[13px] text-muted">
                    {'url' in r && r.url ? (
                      <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                        {r.org} <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    ) : (
                      r.org
                    )}
                    {'note' in r && r.note ? ` · ${r.note}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Skills */}
      <section className="card mt-4 p-5">
        <h3 className="mb-4 text-[15px] font-semibold">Skills</h3>
        <div className="grid gap-4 @xl:grid-cols-2">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div key={group}>
              <p className="eyebrow mb-2">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
