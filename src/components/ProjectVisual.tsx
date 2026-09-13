import type { Visual } from "../data/system";

/** Pure-CSS HUD previews — one visual language per kind of project. */
export default function ProjectVisual({ visual }: { visual: Visual }) {
  const { kind, label, tokens = [] } = visual;

  if (kind === "dashboard")
    return (
      <div className="hud-panel hud-corners relative aspect-[4/3] w-full overflow-hidden p-4">
        <div className="label-mono flex items-center justify-between border-b border-border pb-3">
          <span>{label}</span>
          <span className="flex gap-1">
            <i className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-foreground/60" />
            <i className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {["PRESENT", "RECORDS", "SESSIONS"].map((k) => (
            <div key={k} className="border border-border p-3">
              <div className="label-mono text-[9px]">{k}</div>
              <div className="mt-2 h-1 w-full bg-border">
                <div className="h-1 bg-foreground/70" style={{ width: `${40 + k.length * 3}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-28 items-end gap-1 border border-border p-2">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 bg-foreground/30"
              style={{ height: `${(18 + Math.abs(Math.sin(i * 0.9)) * 80).toFixed(2)}%` }}
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-8 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={`aspect-square border border-border ${i % 5 === 0 ? "bg-foreground/20" : ""}`} />
          ))}
        </div>
      </div>
    );

  if (kind === "system")
    return (
      <div className="hud-panel hud-corners relative aspect-[4/3] w-full overflow-hidden p-4">
        <div className="label-mono border-b border-border pb-3">{label}</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-52 w-52">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-border-strong" />
            <div className="absolute inset-6 animate-spin-slow-reverse rounded-full border border-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rotate-45 border border-border-strong" />
            </div>
            {tokens.slice(0, 4).map((t, i) => (
              <span
                key={t}
                className="label-mono absolute bg-background px-1 text-[9px] text-foreground"
                style={{
                  top: `${50 - 46 * Math.cos((i * Math.PI) / 2)}%`,
                  left: `${50 + 46 * Math.sin((i * Math.PI) / 2)}%`,
                  transform: "translate(-50%,-50%)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );

  if (kind === "code")
    return (
      <div className="hud-panel hud-corners relative aspect-[4/3] w-full overflow-hidden p-4">
        <div className="label-mono flex items-center justify-between border-b border-border pb-3">
          <span>{label}</span>
          <span>UTF-8</span>
        </div>
        <div className="mt-4 space-y-2.5 font-mono text-[11px]">
          {[18, 42, 64, 36, 72, 28, 54, 46, 22, 60].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-5 text-right text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="h-2 bg-foreground/25"
                style={{ width: `${w}%`, marginLeft: `${(i % 3) * 12}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    );

  const prefix = tokens[0] ?? "P";
  return (
    <div className="hud-panel hud-corners relative aspect-[4/3] w-full overflow-hidden p-4">
      <div className="label-mono border-b border-border pb-3">{label}</div>
      <div className="mt-4 grid h-[calc(100%-3rem)] grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-end border border-border bg-gradient-to-b from-foreground/10 to-transparent p-2 transition-transform duration-500 hover:-translate-y-1"
          >
            <span className="label-mono text-[9px]">
              {prefix}/{String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
