import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { AppId } from './meta';

/** Props every app receives from the window it runs in. */
export interface AppProps {
  payload?: Record<string, unknown>;
}

/**
 * App code is lazy-loaded: nothing ships in the main bundle until the
 * visitor actually opens that app.
 */
export const appComponents: Record<AppId, LazyExoticComponent<ComponentType<AppProps>>> = {
  about: lazy(() => import('./about/AboutApp')),
  projects: lazy(() => import('./projects/ProjectsApp')),
  webro: lazy(() => import('./webro/WebroApp')),
  achievements: lazy(() => import('./achievements/AchievementsApp')),
  resume: lazy(() => import('./resume/ResumeApp')),
  terminal: lazy(() => import('./terminal/TerminalApp')),
  mail: lazy(() => import('./mail/MailApp')),
  settings: lazy(() => import('./settings/SettingsApp')),
  notes: lazy(() => import('./notes/NotesApp')),
  snake: lazy(() => import('./snake/SnakeApp')),
  aboutos: lazy(() => import('./aboutos/AboutOsApp')),
};

export function AppLoading() {
  return (
    <div className="grid h-full min-h-[160px] place-items-center" role="status" aria-label="Loading">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
    </div>
  );
}
