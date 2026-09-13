interface TickerProps {
  /** Phrases repeated across the strip, separated by a hard glyph */
  items: string[];
  /** Solid ink bar with knocked-out type (default) or outlined on paper */
  variant?: "solid" | "outline";
  /** Scroll the strip right-to-left (default) or left-to-right */
  reverse?: boolean;
  /** Type scale of the strip */
  size?: "sm" | "lg";
}

/**
 * Full-bleed marquee strip — the brutalist divider that sits between sections.
 * The content is duplicated once so the -50% translate loops seamlessly; the
 * second copy is hidden from assistive tech.
 */
const Ticker = ({ items, variant = "solid", reverse = false, size = "sm" }: TickerProps) => {
  const solid = variant === "solid";

  return (
    <div
      className={[
        "relative w-full overflow-hidden select-none",
        solid
          ? "bg-foreground text-background"
          : "bg-background text-foreground border-y-[1.5px] border-rule",
        size === "lg" ? "py-5 md:py-7" : "py-3 md:py-4",
      ].join(" ")}
    >
      <div
        className={[
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        ].join(" ")}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={[
                    "font-mono uppercase whitespace-nowrap",
                    size === "lg"
                      ? "text-lg md:text-3xl font-semibold tracking-[0.12em]"
                      : "text-[11px] md:text-xs font-medium tracking-[0.3em]",
                  ].join(" ")}
                >
                  {item}
                </span>
                {/* hard separator glyph */}
                <span
                  className={[
                    "inline-block shrink-0",
                    size === "lg" ? "mx-6 md:mx-10 w-3 h-3" : "mx-5 md:mx-7 w-1.5 h-1.5",
                    solid ? "bg-background" : "bg-foreground",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
