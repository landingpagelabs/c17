"use client";

import { useEffect } from "react";

const FAVICON_DEFAULT = "/images/header/favicon-default.png";
const FAVICON_AWAY = "/images/header/favicon-change.png";
const FLASH_TITLE = "(1) New Message!";
const FLASH_INTERVAL = 1000;

/**
 * While the tab is in the background, swaps the favicon and flashes the title.
 * Clicking anything marked data-stop-flashing="true" opts out for the session.
 */
export function TabAttention() {
  useEffect(() => {
    // Matches both rel="icon" and rel="shortcut icon".
    const link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    const originalTitle = document.title;

    let timer: ReturnType<typeof setInterval> | null = null;
    let flashing = false;
    let optedOut = false;

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      document.title = originalTitle;
    };

    const start = () => {
      if (optedOut || timer) return;
      timer = setInterval(() => {
        document.title = flashing ? FLASH_TITLE : originalTitle;
        flashing = !flashing;
      }, FLASH_INTERVAL);
    };

    const onVisibilityChange = () => {
      const hidden = document.hidden;
      if (link) link.href = hidden ? FAVICON_AWAY : FAVICON_DEFAULT;
      if (hidden) start();
      else stop();
    };

    const onOptOut = () => {
      optedOut = true;
      stop();
    };

    const optOutButtons = Array.from(
      document.querySelectorAll('[data-stop-flashing="true"]')
    );

    document.addEventListener("visibilitychange", onVisibilityChange);
    optOutButtons.forEach((b) => b.addEventListener("click", onOptOut));

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      optOutButtons.forEach((b) => b.removeEventListener("click", onOptOut));
      stop();
    };
  }, []);

  return null;
}
