import { useEffect, useState } from "react";

/** True only after the first client render — gate for browser-only UI. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** True on coarse pointers, small screens or reduced motion: drop expensive effects. */
export function useIsLite() {
  const [lite, setLite] = useState(true);
  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.matchMedia("(max-width: 768px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLite(coarse || small || reduced);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return lite;
}
