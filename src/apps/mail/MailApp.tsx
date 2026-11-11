import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Github, Globe, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { profile } from '../../data/profile';
import type { AppProps } from '../registry';

/**
 * Set VITE_FORMSPREE_ID (e.g. "xyzabcd") in Vercel's environment variables to
 * deliver messages straight to your inbox. Without it, Send opens the
 * visitor's mail app with everything pre-filled.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'GitHub', value: 'Gauravdeori', href: profile.socials.github, icon: Github },
  { label: 'LinkedIn', value: 'Gaurav Deori', href: profile.socials.linkedin, icon: Linkedin },
  { label: 'Website', value: 'gauravdeori.in', href: profile.website, icon: Globe },
];

export default function MailApp({ payload }: AppProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const subject = payload?.subject as string | undefined;
    if (subject) setForm((f) => ({ ...f, subject }));
  }, [payload]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      const body = `${form.message}\n\n— ${form.name} (${form.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || `Hello from ${form.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: form.subject || `Portfolio message from ${form.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex h-full min-h-[440px] flex-col @2xl:flex-row">
      {/* Sidebar: direct links */}
      <aside className="shrink-0 border-b border-line/10 p-4 @2xl:w-60 @2xl:border-b-0 @2xl:border-r">
        <p className="eyebrow mb-3">Reach me directly</p>
        <ul className="grid gap-1 @md:grid-cols-2 @2xl:grid-cols-1">
          {links.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-line/[0.07]"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] text-muted">{label}</span>
                  <span className="block truncate text-[13px] font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Compose */}
      <form onSubmit={onSubmit} className="flex min-w-0 flex-1 flex-col gap-3 p-4 @xl:p-5" aria-label="Compose message">
        <div className="flex items-center gap-3 border-b border-line/10 pb-3 text-[13px]">
          <span className="w-12 text-muted">To</span>
          <span className="chip chip-accent">
            {profile.name} &lt;{profile.email}&gt;
          </span>
        </div>
        <div className="grid gap-3 @xl:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[12px] text-muted">Your name</span>
            <input required value={form.name} onChange={update('name')} className="input" autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-1 block text-[12px] text-muted">Your email</span>
            <input required type="email" value={form.email} onChange={update('email')} className="input" autoComplete="email" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-[12px] text-muted">Subject</span>
          <input value={form.subject} onChange={update('subject')} className="input" placeholder="Project, role or just hello" />
        </label>
        <label className="flex flex-1 flex-col">
          <span className="mb-1 block text-[12px] text-muted">Message</span>
          <textarea required value={form.message} onChange={update('message')} className="input min-h-[140px] flex-1" placeholder="Tell me what you're building…" />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          <p role="status" className="text-[13px]">
            {status === 'sent' && (
              <span className="inline-flex items-center gap-1.5 text-emerald-500">
                <CheckCircle2 size={15} aria-hidden="true" />
                {FORMSPREE_ID ? "Sent! I'll get back to you soon." : 'Your mail app should open with the message ready.'}
              </span>
            )}
            {status === 'error' && (
              <span className="text-rose-500">
                Couldn't send. Please email{' '}
                <a className="underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </span>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
