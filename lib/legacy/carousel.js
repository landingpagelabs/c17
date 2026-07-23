// Раніше gsap вантажився з CDN у глобальну змінну — тепер це npm-пакет.
import gsap from "gsap";

const ROTATE_INTERVAL = 2600;

// watch / youtu.be / embed → embed з autoplay
function toEmbed(url) {
  const m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return "https://www.youtube.com/embed/" + (m ? m[1] : "") + "?autoplay=1&rel=0";
}

const SLOTS = {
  "0": { w: 348, h: 407, x: 0, ry: 0, o: 1, zi: 50 },
  "1": { w: 220, h: 407, x: 339, ry: 11, o: 1, zi: 40 },
  "-1": { w: 220, h: 407, x: -339, ry: -11, o: 1, zi: 40 },
  "2": { w: 93, h: 293, x: 204, ry: 16, o: 0.7, zi: 20 },
  "-2": { w: 93, h: 293, x: -204, ry: -16, o: 0.7, zi: 20 },
  "3": { w: 62, h: 240, x: 250, ry: 20, o: 0, zi: 10 },
  "-3": { w: 62, h: 240, x: -250, ry: -20, o: 0, zi: 10 },
};

function slotOf(i, active, n) {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

function initCarousel() {
  const stage = document.querySelector(".carousel_stage");
  const dock = document.querySelector(".carousel_dock");
  const modal = document.querySelector(".carousel_modal");
  if (!stage || !dock || !modal) return;

  // Відео та стартовий бренд приходять з CMS через data-атрибути.
  const VIDEO_URL = toEmbed(stage.dataset.video);
  const ACTIVE_BRAND = stage.dataset.activeBrand || "acquisition";

  const cards = gsap.utils.toArray(".carousel_card", stage);
  const dockItems = gsap.utils.toArray(".carousel_dock-item", dock);
  const play = stage.querySelector(".carousel_play");
  const videoBox = modal.querySelector(".carousel_modal-video");
  const closeBtn = modal.querySelector(".carousel_modal-close");
  const N = cards.length;
  if (!N) return;

  let active = Math.max(0, cards.findIndex((c) => c.dataset.brand === ACTIVE_BRAND));
  let timer = null;
  let hovering = false;
  let inView = false;
  let modalOpen = false;

  gsap.set(cards, { xPercent: -50, yPercent: -50, transformPerspective: 1600 });

  const layout = (animate) => {
    cards.forEach((card, i) => {
      const t = SLOTS[slotOf(i, active, N)];
      card.style.zIndex = t.zi;
      gsap.to(card, {
        width: t.w,
        height: t.h,
        x: t.x,
        rotationY: t.ry,
        autoAlpha: t.o,
        duration: animate ? 0.9 : 0,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  const updateDock = () => {
    dockItems.forEach((it, i) => it.classList.toggle("is-active", i === active));
  };

  const setActive = (i) => {
    active = ((i % N) + N) % N;
    layout(true);
    updateDock();
  };

  const startAuto = () => {
    stopAuto();
    if (!inView || hovering || modalOpen) return;
    timer = setInterval(() => setActive(active + 1), ROTATE_INTERVAL);
  };
  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const openModal = () => {
    videoBox.innerHTML =
      '<iframe src="' + VIDEO_URL + '" title="Video review" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalOpen = true;
    stopAuto();
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalOpen = false;
    setTimeout(() => {
      videoBox.innerHTML = "";
    }, 350);
    startAuto();
  };

  // Перетягування карток обертає карусель --------------------------------
  const track = stage.querySelector(".carousel_track");
  const DRAG_THRESHOLD = 8;   // px, після якого це вже drag, а не клік
  const STEP = 90;            // px перетягування на одну картку
  let dragMoved = false;      // чи був рух — тоді гасимо наступний клік

  if (track) {
    let dragging = false;
    let startX = 0;
    let startActive = 0;

    track.style.touchAction = "pan-y"; // вертикальний скрол лишаємо системі

    track.addEventListener("pointerdown", (e) => {
      dragging = true;
      dragMoved = false;
      startX = e.clientX;
      startActive = active;
      hovering = true;
      stopAuto();
      try { track.setPointerCapture(e.pointerId); } catch (_) {}
    });

    track.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) dragMoved = true;
      // Живе обертання: рухаємо активну картку за курсором (drag ліворуч → далі)
      const steps = Math.round(-dx / STEP);
      const target = ((startActive + steps) % N + N) % N;
      if (target !== active) setActive(target);
    });

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      hovering = false;
      startAuto();
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
  }

  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => card.classList.add("is-hover"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-hover"));
    card.addEventListener("click", () => {
      if (dragMoved) return; // це було перетягування, а не клік
      i === active ? openModal() : setActive(i);
    });
  });

  dockItems.forEach((item, i) => item.addEventListener("click", () => setActive(i)));

  play.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal();
  });

  [stage, dock].forEach((el) => {
    el.addEventListener("mouseenter", () => {
      hovering = true;
      stopAuto();
    });
    el.addEventListener("mouseleave", () => {
      hovering = false;
      startAuto();
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".carousel_modal-video, .carousel_modal-cta")) closeModal();
  });
  // CTA у модалці: закрити модалку і миттєво проскролити до форми —
  // раніше кліком скролило сторінку ПІД відкритою модалкою.
  const modalCta = modal.querySelector(".carousel_modal-cta");
  if (modalCta) {
    modalCta.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
      const target = document.querySelector(".campaign");
      if (!target) return;
      const header = document.querySelector(".header");
      const offset = header ? header.offsetHeight : 0;
      window.scrollTo(0, target.getBoundingClientRect().top + window.pageYOffset - offset);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOpen) closeModal();
  });

  new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      if (inView) startAuto();
      else stopAuto();
    },
    { threshold: 0.25 }
  ).observe(stage);

  layout(false);
  updateDock();
}

initCarousel();
