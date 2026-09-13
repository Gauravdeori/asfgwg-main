import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  cursor?: string;
};

/**
 * Button with a magnetic pull toward the pointer (desktop only). On hover it
 * also drops onto a hard offset shadow — box-shadow, not transform, so it
 * doesn't fight the magnetic translate.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  type = "button",
  external = false,
  cursor,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "inline-flex items-center justify-center gap-3 px-7 py-3.5 font-mono text-[11px] tracking-[0.22em] uppercase will-change-transform transition-[background-color,color,box-shadow,border-color] duration-300 hover:shadow-[5px_5px_0_hsl(var(--rule))]";
  const styles =
    variant === "solid"
      ? "bg-foreground text-background border border-foreground"
      : "border border-border-strong text-foreground hover:border-foreground hover:bg-surface-2";

  const props = {
    ref: ref as never,
    onPointerMove: onMove,
    onPointerLeave: reset,
    className: `${base} ${styles} ${className}`,
    "data-cursor": cursor,
  };

  if (href)
    return (
      <a
        {...props}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );

  return (
    <button {...props} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
