import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';

const N = 18; // grid cells per side
const BEST_KEY = 'gauravos-snake-best';
type P = { x: number; y: number };
type Status = 'ready' | 'playing' | 'paused' | 'over';

const DIRS: Record<string, P> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

const randomFood = (snake: P[]): P => {
  let p: P;
  do p = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) };
  while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
};

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

export default function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const snake = useRef<P[]>([{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }]);
  const dir = useRef<P>({ x: 1, y: 0 });
  const queued = useRef<P | null>(null);
  const food = useRef<P>(randomFood(snake.current));
  const [status, setStatus] = useState<Status>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const accent = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()})`;
    const size = cv.width / N;
    ctx.fillStyle = '#0d0d14';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) if ((x + y) % 2) ctx.fillRect(x * size, y * size, size, size);
    // food
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(food.current.x * size + size / 2, food.current.y * size + size / 2, size * 0.32, 0, Math.PI * 2);
    ctx.fill();
    // snake
    snake.current.forEach((p, i) => {
      ctx.fillStyle = accent;
      ctx.globalAlpha = i === 0 ? 1 : Math.max(0.45, 1 - i * 0.03);
      const pad = size * 0.08;
      ctx.beginPath();
      ctx.roundRect(p.x * size + pad, p.y * size + pad, size - pad * 2, size - pad * 2, size * 0.25);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, []);

  const reset = useCallback(() => {
    snake.current = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
    dir.current = { x: 1, y: 0 };
    queued.current = null;
    food.current = randomFood(snake.current);
    setScore(0);
    draw();
  }, [draw]);

  const turn = useCallback((d: P) => {
    const cur = queued.current ?? dir.current;
    if (d.x === -cur.x && d.y === -cur.y) return; // no reversing into yourself
    queued.current = d;
    setStatus((s) => (s === 'ready' || s === 'paused' ? 'playing' : s));
  }, []);

  // Game loop
  useEffect(() => {
    draw();
    if (status !== 'playing') return;
    const speed = Math.max(70, 130 - score * 3);
    const id = setInterval(() => {
      if (queued.current) {
        dir.current = queued.current;
        queued.current = null;
      }
      const head = { x: snake.current[0].x + dir.current.x, y: snake.current[0].y + dir.current.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= N || head.y >= N;
      const hitSelf = snake.current.some((p) => p.x === head.x && p.y === head.y);
      if (hitWall || hitSelf) {
        setStatus('over');
        setBest((b) => {
          const nb = Math.max(b, snake.current.length - 3);
          try {
            localStorage.setItem(BEST_KEY, String(nb));
          } catch {
            /* ignore */
          }
          return nb;
        });
        return;
      }
      const ate = head.x === food.current.x && head.y === food.current.y;
      snake.current = [head, ...snake.current.slice(0, ate ? undefined : -1)];
      if (ate) {
        food.current = randomFood(snake.current);
        setScore((s) => s + 1);
      }
      draw();
    }, speed);
    return () => clearInterval(id);
  }, [status, score, draw]);

  useEffect(() => boardRef.current?.focus(), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const d = DIRS[e.key] ?? DIRS[e.key.toLowerCase()];
    if (d) {
      e.preventDefault();
      if (status === 'over') {
        reset();
        setStatus('playing');
      }
      turn(d);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (status === 'over') {
        reset();
        setStatus('playing');
      } else setStatus((s) => (s === 'playing' ? 'paused' : 'playing'));
    }
  };

  // Swipe on touch screens
  const touchStart = useRef<P | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    turn(Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx), y: 0 } : { x: 0, y: Math.sign(dy) });
  };

  const restart = () => {
    reset();
    setStatus('playing');
    boardRef.current?.focus();
  };

  return (
    <div className="flex h-full flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-[400px] items-center justify-between text-[13px]">
        <span>
          Score <strong className="text-accent tabular-nums">{score}</strong>
        </span>
        <span className="text-muted">
          Best <strong className="tabular-nums text-fg">{best}</strong>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            className="btn !h-8 !w-8 !p-0"
            aria-label={status === 'playing' ? 'Pause' : 'Play'}
            onClick={() => (status === 'over' ? restart() : setStatus((s) => (s === 'playing' ? 'paused' : 'playing')))}
          >
            {status === 'playing' ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button type="button" className="btn !h-8 !w-8 !p-0" aria-label="Restart" onClick={restart}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div
        ref={boardRef}
        tabIndex={0}
        role="application"
        aria-label="Snake game. Use arrow keys or WASD to move, Space to pause."
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-square w-full max-w-[400px] touch-none overflow-hidden rounded-xl ring-1 ring-line/10 focus-visible:ring-2 focus-visible:ring-accent"
      >
        <canvas ref={canvasRef} width={720} height={720} className="h-full w-full" />
        {status !== 'playing' && (
          <div className="absolute inset-0 grid place-items-center bg-black/45 text-center text-white backdrop-blur-[2px]">
            <div>
              <p className="text-xl font-semibold">{status === 'over' ? 'Game over' : status === 'paused' ? 'Paused' : 'Snake'}</p>
              <p className="mt-1 text-[13px] text-white/75">
                {status === 'over' ? `You scored ${score}.` : 'Arrow keys / WASD or swipe to move'}
              </p>
              <button type="button" onClick={restart} className="btn btn-primary mt-4">
                {status === 'over' ? 'Play again' : status === 'paused' ? 'Resume' : 'Start'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-screen controls (handy on touch screens) */}
      <div className="grid grid-cols-3 gap-1.5" aria-label="Direction controls">
        <span />
        <button type="button" className="btn !h-10 !w-12 !p-0" aria-label="Up" onClick={() => turn(DIRS.ArrowUp)}>
          <ArrowUp size={16} />
        </button>
        <span />
        <button type="button" className="btn !h-10 !w-12 !p-0" aria-label="Left" onClick={() => turn(DIRS.ArrowLeft)}>
          <ArrowLeft size={16} />
        </button>
        <button type="button" className="btn !h-10 !w-12 !p-0" aria-label="Down" onClick={() => turn(DIRS.ArrowDown)}>
          <ArrowDown size={16} />
        </button>
        <button type="button" className="btn !h-10 !w-12 !p-0" aria-label="Right" onClick={() => turn(DIRS.ArrowRight)}>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
