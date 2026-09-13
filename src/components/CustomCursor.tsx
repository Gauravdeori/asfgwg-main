import { useEffect, useRef, useState } from "react";

/** Desktop-only cursor: dot + trailing ring that grows over interactive targets. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a,button,input,textarea,[data-cursor]",
      );
      setActive(Boolean(el));
      setLabel(el?.dataset.cursor ?? null);
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ring}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-white mix-blend-difference transition-[width,height,opacity] duration-300 ${
          label ? "h-24 w-24" : active ? "h-12 w-12" : "h-8 w-8 opacity-60"
        }`}
      >
        {label && (
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
