/**
 * Tiny synthesized UI sounds (no audio files). A short filtered noise burst
 * makes a plastic "tick"; the wall switch gets a lower, heavier "clack".
 * Sound preference is a small external store so the navbar toggle and the
 * global click listener stay in sync.
 */

const KEY = "gd-sfx";
let ctx: AudioContext | null = null;
let enabled = read();
const listeners = new Set<() => void>();

function read() {
  try {
    return localStorage.getItem(KEY) !== "0";
  } catch {
    return true;
  }
}

export const sfx = {
  get: () => enabled,
  set(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch {
      /* storage blocked — keep in memory */
    }
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function burst(ac: AudioContext, at: number, freq: number, gain: number, length = 0.03) {
  const frames = Math.ceil(ac.sampleRate * length);
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / frames, 3);

  const src = ac.createBufferSource();
  src.buffer = buf;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 1.4;
  const g = ac.createGain();
  g.gain.value = gain;
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(at);
}

export function playClick(kind: "key" | "switch" = "key") {
  if (!enabled) return;
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  if (kind === "switch") {
    burst(ac, t, 1400, 0.55, 0.045);
    burst(ac, t + 0.012, 520, 0.4, 0.06);
  } else {
    burst(ac, t, 3200, 0.28, 0.025);
  }
}
