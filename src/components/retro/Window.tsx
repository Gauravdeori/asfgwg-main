import type { ReactNode } from "react";
import PixelIcon, { type PixelIconName } from "./PixelIcon";

type TitleBarProps = {
  title: string;
  icon?: PixelIconName;
  /** grey title bar that lights up when the parent `.group` is hovered */
  inactive?: boolean;
  /** custom controls for the right side (e.g. a real close button) */
  controls?: ReactNode;
};

/** Window title bar: icon, name, grip lines and (decorative) window buttons. */
export function TitleBar({ title, icon = "file", inactive = false, controls }: TitleBarProps) {
  return (
    <div className="win-title" {...(inactive ? { "data-off": "" } : {})}>
      <PixelIcon name={icon} size={13} />
      <span className="truncate">{title}</span>
      <span className="win-grip" aria-hidden="true" />
      {controls ?? (
        <span className="flex gap-1" aria-hidden="true">
          <span className="win-btn">
            <PixelIcon name="minimize" size={8} />
          </span>
          <span className="win-btn">
            <PixelIcon name="maximize" size={8} />
          </span>
          <span className="win-btn">
            <PixelIcon name="close" size={8} />
          </span>
        </span>
      )}
    </div>
  );
}

/** Status bar cells along the bottom edge of a window; the first cell stretches. */
export function StatusBar({ cells }: { cells: ReactNode[] }) {
  return (
    <div className="win-status">
      {cells.map((cell, i) => (
        <span key={i} className={i === 0 ? "flex-1 truncate" : "shrink-0"}>
          {cell}
        </span>
      ))}
    </div>
  );
}

type Props = TitleBarProps & {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  status?: ReactNode[];
};

/** A retro desktop window: title bar, body and optional status bar. */
export default function Window({
  title,
  icon,
  inactive,
  controls,
  children,
  className = "",
  bodyClassName = "p-5 md:p-7",
  status,
}: Props) {
  return (
    <div className={`win flex flex-col ${className}`}>
      <TitleBar title={title} icon={icon} inactive={inactive} controls={controls} />
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
      {status && <StatusBar cells={status} />}
    </div>
  );
}
