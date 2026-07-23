"use client";

import { useEffect } from "react";

const DURATION = 2 * 1000;
const TICK = 250;

const DEFAULTS = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/** Fires confetti from both sides for a couple of seconds once the page loads. */
export function Confetti() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let cancelled = false;

    // Loaded on demand: the bundle is only needed on this page, and it touches
    // the DOM at import time.
    import("@tsparticles/confetti").then(({ confetti }) => {
      if (cancelled) return;

      const animationEnd = Date.now() + DURATION;

      interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 20 * (timeLeft / DURATION);

        confetti({
          ...DEFAULTS,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...DEFAULTS,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, TICK);
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return null;
}
