import { useSettings } from '../store/settingsStore';
import { wallpapers } from '../lib/appearance';

/** Full-bleed wallpaper from Settings; follows the theme and accent. */
export default function Wallpaper({ className = '', dim = false }: { className?: string; dim?: boolean }) {
  const theme = useSettings((s) => s.theme);
  const wallpaper = useSettings((s) => s.wallpaper);
  const css = (wallpapers[wallpaper] ?? wallpapers.aurora).css[theme];

  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className}`} style={{ background: css }}>
      {dim && <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />}
    </div>
  );
}
