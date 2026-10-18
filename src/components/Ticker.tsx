import React from 'react';

interface TickerProps {
  items: string[];
  variant?: 'solid' | 'outline';
  speed?: 'normal' | 'fast';
  reverse?: boolean;
}

export const Ticker: React.FC<TickerProps> = ({
  items,
  variant = 'solid',
  speed = 'normal',
  reverse = false,
}) => {
  const isSolid = variant === 'solid';

  return (
    <div
      className={`relative w-full overflow-hidden select-none border-y border-border py-2.5 sm:py-3 transition-colors ${
        isSolid
          ? 'bg-surface-2 text-text'
          : 'bg-surface text-text-muted hover:text-text'
      }`}
    >
      <div
        className={`flex w-max ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${speed === 'fast' ? '[animation-duration:18s]' : '[animation-duration:32s]'}`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 || undefined}
          >
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap px-3 sm:px-4">
                  {item}
                </span>
                <span
                  className="w-1.5 h-1.5 bg-highlight inline-block shrink-0 select-none"
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
