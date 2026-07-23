// Раніше gsap/ScrollTrigger вантажились з CDN у глобальні змінні.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function microStep1(root) {
  const checks = root.querySelectorAll(".hiw_row[data-check] .hiw_check");
  checks.forEach((check) => {
    const icon = check.querySelector(".hiw_check-icon");
    gsap.set(check, { backgroundColor: "#fff", borderColor: "#CACACA" });
    gsap.set(icon, { opacity: 0, scale: 0.4 });
  });
  checks.forEach((check, i) => {
    const icon = check.querySelector(".hiw_check-icon");
    gsap
      .timeline({ delay: 0.25 + i * 0.5 })
      .to(check, { backgroundColor: "#12A557", borderColor: "#12A557", duration: 0.2, ease: "power2.out" })
      .to(icon, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, "-=0.05");
  });
}

function microStep2(root) {
  const radios = root.querySelectorAll(".hiw_radio");
  const fill = root.querySelector(".hiw_slider-fill");
  const handle = root.querySelector(".hiw_slider-handle");
  radios[0].classList.add("is-on");
  radios[1].classList.remove("is-on");
  gsap.set(fill, { width: 74 });
  gsap.set(handle, { x: -36 });
  gsap
    .timeline({ delay: 0.2 })
    .to(handle, { x: 0, duration: 0.6, ease: "power2.out" }, 0)
    .to(fill, { width: 110, duration: 0.6, ease: "power2.out" }, 0)
    .add(() => {
      radios[0].classList.remove("is-on");
      radios[1].classList.add("is-on");
      gsap.fromTo(radios[1], { scale: 0.7 }, { scale: 1, duration: 0.35, ease: "back.out(2.5)" });
    }, 0.55);
}

function microStep3(root) {
  const bubble = root.querySelector(".hiw_bubble");
  const bar = root.querySelector(".hiw_bar-fill");
  const check = root.querySelector(".hiw_handoff-check-badge");
  gsap.set(bubble, { opacity: 0, scale: 0.6, y: 8, transformOrigin: "50% 100%" });
  gsap.set(bar, { width: "0%" });
  gsap.set(check, { scale: 0 });
  gsap
    .timeline({ delay: 0.15 })
    .to(bar, { width: "72%", duration: 0.7, ease: "power2.out" }, 0)
    .to(check, { scale: 1, duration: 0.45, ease: "back.out(2.2)" }, 0.2)
    .to(bubble, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.7)" }, 0.35);
}

function initHowItWorks() {
  const hiw = document.querySelector(".hiw");
  if (!hiw) return;

  const fill = hiw.querySelector(".hiw_clock-fill");
  const steps = gsap.utils.toArray(".hiw_step", hiw);
  if (steps.length < 3) return;

  const circumference = fill.getTotalLength();
  gsap.set(fill, { strokeDasharray: circumference });
  const setFill = (progress) => gsap.set(fill, { strokeDashoffset: circumference * (1 - progress) });
  const micros = [microStep1, microStep2, microStep3];

  setFill(0);
  gsap.set(steps, { autoAlpha: 0 });
  gsap.set(steps[0], { autoAlpha: 1 });

  let current = 0;
  const playMicro = (i) => micros[i](steps[i]);

  const setStep = (i) => {
    if (i === current) return;
    current = i;
    // Ховаємо ВСІ неактивні кроки (не лише попередній) і додаємо overwrite:
    // при швидкому скролі вгору/вниз це вбиває конкурентні tween'и, тож два
    // кроки більше не лишаються видимими одночасно (кросовер контенту).
    steps.forEach((step, si) => {
      if (si === i) return;
      gsap.to(step, { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in", overwrite: true });
    });
    gsap.fromTo(
      steps[i],
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true }
    );
    playMicro(i);
  };

  // Мобільна версія: CSS-sticky пін + IntersectionObserver-сентинели
  // (НЕ gsap pin — він смикається від resize мобільного URL-бару).
  // Кнопки Prev/Next лишаються: у sticky-режимі вони скролять сторінку до
  // зони кроку, у reduced-motion — перемикають крок напряму.
  if (window.matchMedia("(max-width: 991px)").matches) {
    const LAST = steps.length - 1;
    const prevBtns = hiw.querySelectorAll(".hiw_nav-prev");
    const nextBtns = hiw.querySelectorAll(".hiw_nav-next");

    // Reduced-motion: без анімацій — миттєва підміна кроку
    const show = REDUCED_MOTION
      ? (i) => {
          steps.forEach((step, si) => gsap.set(step, { autoAlpha: si === i ? 1 : 0, y: 0 }));
          current = i;
        }
      : setStep;

    const goTo = (i) => {
      i = Math.max(0, Math.min(LAST, i));
      show(i);
      setFill((i + 1) / steps.length); // прогрес-дуга росте з кожним кроком
      prevBtns.forEach((b) => (b.disabled = i === 0));
      nextBtns.forEach((b) => (b.disabled = i === LAST));
    };

    // Старт: перший крок, 1/3 дуги, Prev вимкнено
    setFill(1 / steps.length);
    if (!REDUCED_MOTION) playMicro(0);
    prevBtns.forEach((b) => (b.disabled = true));

    const runway = hiw.closest(".how-it-works_animation");
    const stickyMode =
      !REDUCED_MOTION && runway && getComputedStyle(hiw).position === "sticky";

    if (stickyMode) {
      // Сентинели на 8/41/75% доріжки; крок вмикається, коли сентинел
      // перетинає середню смугу в'юпорта (rootMargin -40%).
      const POS = [8, 41.4, 74.8];
      const sentinels = POS.map((pct, i) => {
        const s = document.createElement("div");
        s.setAttribute("aria-hidden", "true");
        s.style.cssText = `position:absolute;left:0;top:${pct}%;width:1px;height:1px;pointer-events:none;`;
        s.dataset.step = i;
        runway.appendChild(s);
        return s;
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) goTo(Number(e.target.dataset.step));
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      sentinels.forEach((s) => io.observe(s));

      // Кнопки скролять до зони кроку — сам показ робить обсервер
      const scrollToStep = (i) => {
        i = Math.max(0, Math.min(LAST, i));
        const top = runway.getBoundingClientRect().top + window.scrollY;
        const target = top + (runway.offsetHeight * POS[i]) / 100 - window.innerHeight / 2 + 2;
        window.scrollTo({ top: target, behavior: "smooth" });
      };
      prevBtns.forEach((b) => b.addEventListener("click", () => scrollToStep(current - 1)));
      nextBtns.forEach((b) => b.addEventListener("click", () => scrollToStep(current + 1)));
    } else {
      prevBtns.forEach((b) => b.addEventListener("click", () => goTo(current - 1)));
      nextBtns.forEach((b) => b.addEventListener("click", () => goTo(current + 1)));
    }
    return;
  }

  if (REDUCED_MOTION) return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: hiw,
    start: "center center",
    end: () => "+=" + Math.round(window.innerHeight * 2.6),
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onEnter: () => playMicro(current),
    onEnterBack: () => playMicro(current),
    onUpdate: (self) => {
      const p = self.progress;
      setFill(p);
      setStep(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
    },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

initHowItWorks();
