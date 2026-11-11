import { Award, Briefcase, ExternalLink, Rocket, Trophy, type LucideIcon } from 'lucide-react';
import { achievements, stats } from '../../data/profile';
import { openApp } from '../../store/windowStore';

const kindIcon: Record<string, LucideIcon> = { hackathon: Trophy, work: Briefcase, startup: Rocket, certificate: Award };

export default function AchievementsApp() {
  const [featured, ...rest] = achievements;

  return (
    <div className="mx-auto max-w-3xl p-5 @xl:p-7">
      <p className="eyebrow">Achievements</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight">Wins, milestones & proof of work</h2>

      {/* Featured win */}
      <section
        className="relative mt-5 overflow-hidden rounded-2xl p-6 text-white"
        style={{ background: 'linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--accent) / .55) 100%)' }}
      >
        <Trophy size={120} strokeWidth={1.2} className="absolute -right-4 -top-4 text-white/15" aria-hidden="true" />
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">Hackathon win</p>
        <h3 className="mt-2 text-2xl font-bold">{featured.title}</h3>
        <p className="mt-2 max-w-lg text-white/85">{featured.detail}</p>
        {'projectId' in featured && (
          <button
            type="button"
            onClick={() => openApp('projects', { projectId: featured.projectId })}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-white/20 px-3.5 text-[13px] font-medium backdrop-blur hover:bg-white/30"
          >
            See EcoBin →
          </button>
        )}
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3 @xl:grid-cols-4" aria-label="By the numbers">
        {stats.map((s) => (
          <div key={s.label} className="card px-4 py-3">
            <p className="text-2xl font-bold text-accent">{s.value}</p>
            <p className="text-[12px] text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <ul className="mt-4 space-y-3">
        {rest.map((a) => {
          const Icon = kindIcon[a.kind] ?? Award;
          return (
            <li key={a.id} className="card flex items-start gap-4 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon size={19} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{a.title}</p>
                <p className="mt-0.5 text-[13.5px] text-muted">{a.detail}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-[13px]">
                  {'projectId' in a && a.projectId && (
                    <button type="button" onClick={() => openApp('projects', { projectId: a.projectId })} className="text-accent hover:underline">
                      View project →
                    </button>
                  )}
                  {'url' in a && a.url && (
                    <a href={a.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                      Verify credential <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
