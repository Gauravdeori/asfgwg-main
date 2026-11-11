import { apps, type AppId } from '../apps/meta';

/**
 * The one icon style used everywhere: a rounded tile in the accent colour
 * with a white glyph and a soft glossy highlight.
 */
export default function AppIcon({ id, size = 48, className = '' }: { id: AppId; size?: number; className?: string }) {
  const Icon = apps[id].icon;
  return (
    <span
      aria-hidden="true"
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden text-white ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        background:
          'linear-gradient(160deg, rgb(255 255 255 / .28) 0%, rgb(255 255 255 / 0) 45%), linear-gradient(160deg, rgb(var(--accent)) 0%, rgb(var(--accent) / .72) 100%)',
        boxShadow: `inset 0 1px 0 rgb(255 255 255 / .35), 0 ${size * 0.1}px ${size * 0.3}px -${size * 0.1}px rgb(var(--accent) / .65)`,
      }}
    >
      <Icon size={size * 0.5} strokeWidth={1.9} />
    </span>
  );
}
