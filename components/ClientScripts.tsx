"use client";

import { useEffect } from "react";

/**
 * The original site's behaviour is imperative, class-driven vanilla JS. Rather
 * than rewrite ~700 lines of GSAP/Masonry/form logic into React, the modules are
 * kept intact under lib/legacy and imported once the markup is on the page —
 * they query the DOM at import time, and ES module caching keeps them from
 * running twice under Strict Mode's double-invoked effects.
 */
export function ClientScripts() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      await import("../lib/legacy/header.js");
      if (cancelled) return;
      await import("../lib/legacy/all.js");
      if (cancelled) return;
      await import("../lib/legacy/carousel.js");
      if (cancelled) return;
      await import("../lib/legacy/how-it-works.js");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
