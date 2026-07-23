// Раніше Masonry вантажився з CDN у глобальну змінну — тепер це npm-пакет.
import Masonry from "masonry-layout";

// REVIEWS: Masonry + розгортання/згортання -------------------------------
var grid = document.querySelector(".reviews_list");

if (grid) {
  var msnry = new Masonry(grid, {
    itemSelector: ".reviews_item",
    columnWidth: 349,
    gutter: 15,
    horizontalOrder: true,
  });

  // Лейзі-завантаження: Masonry міряє висоти один раз, тому перелейауткуємо
  // сітку щоразу, коли докачується зображення (інакше картки перекриваються).
  grid.querySelectorAll("img").forEach(function (img) {
    if (!img.complete) {
      img.addEventListener("load", function () { msnry.layout(); }, { once: true });
    }
  });

  // На мобілі (≤991px) показуємо 3 відгуки, на десктопі — 12
  var VISIBLE_COUNT = window.matchMedia("(max-width: 991px)").matches ? 3 : 12;
  var section = document.querySelector(".reviews");
  var cta = document.querySelector(".reviews_cta");
  var ctaText = cta ? cta.querySelector(".reviews_cta-text") : null;

  // Усі items; зайві (13-й і далі) тримаємо в пам'яті поза DOM
  var items = Array.prototype.slice.call(grid.querySelectorAll(".reviews_item"));
  var extraItems = items.slice(VISIBLE_COUNT);
  var expanded = false;

  if (extraItems.length && cta) {
    // Старт: прибираємо зайві з DOM і перебудовуємо сітку на 12
    extraItems.forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    msnry.reloadItems();
    msnry.layout();

    cta.addEventListener("click", function () {
      // Позиція кнопки у в'юпорті ДО перебудови — щоб не втратити місце
      var beforeTop = cta.getBoundingClientRect().top;
      // Тримаємо кнопку під курсором: після зміни висоти сітки компенсуємо скрол
      var anchor = function () {
        var delta = cta.getBoundingClientRect().top - beforeTop;
        if (delta) window.scrollBy(0, delta);
      };

      expanded = !expanded;

      if (expanded) {
        // Повертаємо зайві items у DOM і в Masonry
        extraItems.forEach(function (el) {
          grid.appendChild(el);
        });
        msnry.appended(extraItems);
      } else {
        // Прибираємо зайві (Masonry сам приховає + вилучить із DOM)
        msnry.remove(extraItems);
      }
      msnry.layout();

      // Розгортання міняє висоту синхронно → фіксимо в rAF;
      // згортання — після анімації Masonry (layoutComplete).
      requestAnimationFrame(anchor);
      if (typeof msnry.once === "function") msnry.once("layoutComplete", anchor);

      if (section) section.classList.toggle("expanded", expanded);
      if (ctaText) {
        ctaText.textContent = expanded ? "Show Less Reviews" : "Load More Reviews";
      }
    });
  } else if (extraItems.length === 0 && cta) {
    // Відгуків 12 або менше — ховати нічого, прибираємо кнопку
    cta.style.display = "none";
  }
}

// CAMPAIGN strapline: ротація айтемів кожні 5с ---------------------------
var strapline = document.querySelector(".campaign_strapline");

if (strapline) {
  var straplineItems = Array.prototype.slice.call(
    strapline.querySelectorAll(".campaign_strapline-item")
  );

  if (straplineItems.length > 1) {
    var straplineIndex = 0;

    // Гарантуємо, що активний лише перший
    straplineItems.forEach(function (item, i) {
      item.classList.toggle("active", i === 0);
    });

    setInterval(function () {
      straplineItems[straplineIndex].classList.remove("active");
      straplineIndex = (straplineIndex + 1) % straplineItems.length;
      straplineItems[straplineIndex].classList.add("active");
    }, 5000);
  }
}

// CAMPAIGN: мультистеп-форма + прогрес-бар -------------------------------
var campaignForm = document.querySelector(".campaign_form");

if (campaignForm) {
  // Кількість питань тепер задає CMS, а не константа в коді.
  var QUESTION_COUNT = parseInt(campaignForm.dataset.questionCount, 10) || 6;
  var steps = Array.prototype.slice.call(
    campaignForm.querySelectorAll(".campaign_step")
  );
  var progressThumb = campaignForm.querySelector(".campaign_form-progress-thumb");

  function showStep(key) {
    steps.forEach(function (step) {
      step.classList.toggle("active", step.getAttribute("if-step") === String(key));
    });
  }

  function setProgress(pct) {
    if (progressThumb) progressThumb.style.width = pct + "%";
  }

  function goToQuestion(num) {
    showStep(num);
    setProgress((num / QUESTION_COUNT) * 100);
  }

  // Старт з першого питання
  goToQuestion(1);

  // Чи була хоч одна відповідь "No" за весь прохід
  var hasNo = false;

  // Клік по відповіді рухає форму далі (проходимо ВСІ питання)
  steps.forEach(function (step) {
    var key = step.getAttribute("if-step");
    var stepNum = parseInt(key, 10);
    if (isNaN(stepNum)) return; // фінальні екрани (Yes / No) — без відповідей

    var inputs = step.querySelectorAll('input[type="radio"]');
    inputs.forEach(function (input) {
      input.addEventListener("click", function () {
        // Запам'ятовуємо "No", але форму не обриваємо
        if (input.value === "no") hasNo = true;

        if (stepNum >= QUESTION_COUNT) {
          // Пройшли всі 6 питань — вирішуємо фінальний екран
          showStep(hasNo ? "No" : "Yes");
          setProgress(100);
        } else {
          goToQuestion(stepNum + 1);
        }
      });
    });
  });
}

   const acc = document.querySelectorAll(".item-faq");

    acc.forEach((accItem) => {
      accItem.addEventListener("click", function () {
        this.classList.toggle("active");
        const head = this.querySelector('.item-faq_head');
        const panel = this.querySelector('.item-faq_panel');
        panel.classList.toggle("active");
        head.classList.toggle("active");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 24 + "px";
        }
      });
    });

// COMPARE: власний горизонтальний скролбар (видно й на iPhone) -----------
(function () {
  var wrap = document.querySelector(".compare_table-wrap");
  if (!wrap) return;

  var bar = document.createElement("div");
  bar.className = "compare_scrollbar";
  var thumb = document.createElement("div");
  thumb.className = "compare_scrollbar-thumb";
  bar.appendChild(thumb);
  wrap.parentNode.insertBefore(bar, wrap.nextSibling);

  function update() {
    var scrollW = wrap.scrollWidth;
    var clientW = wrap.clientWidth;

    // Тінь на липкій колонці лейблів, поки таблицю зсунуто вправо
    wrap.classList.toggle("is-scrolled", wrap.scrollLeft > 0);

    // Немає що скролити — ховаємо повзунок (десктоп/широкі екрани)
    if (scrollW - clientW <= 1) {
      bar.style.display = "none";
      return;
    }
    bar.style.display = "block";

    var trackW = bar.clientWidth;
    var thumbW = Math.max((clientW / scrollW) * trackW, 32);
    var maxScroll = scrollW - clientW;
    var maxThumb = trackW - thumbW;
    var x = maxScroll > 0 ? (wrap.scrollLeft / maxScroll) * maxThumb : 0;

    thumb.style.width = thumbW + "px";
    thumb.style.transform = "translateX(" + x + "px)";
  }

  wrap.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);

  // Перетягування повзунка
  var dragging = false;
  var startX = 0;
  var startScroll = 0;

  thumb.addEventListener("pointerdown", function (e) {
    dragging = true;
    startX = e.clientX;
    startScroll = wrap.scrollLeft;
    try { thumb.setPointerCapture(e.pointerId); } catch (_) {}
    e.preventDefault();
  });

  thumb.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var maxThumb = bar.clientWidth - thumb.clientWidth;
    var maxScroll = wrap.scrollWidth - wrap.clientWidth;
    var dx = e.clientX - startX;
    wrap.scrollLeft = startScroll + (maxThumb > 0 ? (dx / maxThumb) * maxScroll : 0);
  });

  thumb.addEventListener("pointerup", function (e) {
    dragging = false;
    try { thumb.releasePointerCapture(e.pointerId); } catch (_) {}
  });

  // Клік по треку — стрибок до позиції
  bar.addEventListener("pointerdown", function (e) {
    if (e.target === thumb) return;
    var rect = bar.getBoundingClientRect();
    var thumbW = thumb.clientWidth;
    var maxThumb = bar.clientWidth - thumbW;
    var maxScroll = wrap.scrollWidth - wrap.clientWidth;
    var target = Math.min(Math.max(e.clientX - rect.left - thumbW / 2, 0), maxThumb);
    wrap.scrollLeft = maxThumb > 0 ? (target / maxThumb) * maxScroll : 0;
  });

  update();
})();

// QUOTE: радіо-стан + степер + слайдер + валідація -----------------------
(function () {
  var form = document.querySelector(".quote_form");
  if (!form) return;

  var submit = form.querySelector(".quote_submit");
  var numInput = form.querySelector(".quote_num-input");
  var range = form.querySelector(".quote_range-input");
  var pct = form.querySelector(".quote_pct-input");
  var contacts = form.querySelectorAll(".quote_control");

  // Межі CLV та крок степера тепер задає CMS.
  var CLV_MIN = parseInt(form.dataset.clvMin, 10) || 20000;
  var CLV_MAX = parseInt(form.dataset.clvMax, 10) || 1000000;
  var CLV_STEP = parseInt(form.dataset.clvStep, 10) || 1000;
  function clampClv(v) {
    v = parseInt(String(v).replace(/[^\d]/g, ""), 10);
    if (isNaN(v)) v = CLV_MIN;
    return Math.min(CLV_MAX, Math.max(CLV_MIN, v));
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

  // Перелік перевірок: el — контейнер для класу is-error, ok — валідність
  var checks = [
    {
      el: form.querySelector('[data-q="meetings"]'),
      ok: function () { return !!form.querySelector('input[name="quote-meetings"]:checked'); },
    },
    {
      el: form.querySelector('[data-q="budget"]'),
      ok: function () { return !!form.querySelector('input[name="quote-budget"]:checked'); },
    },
    {
      el: form.querySelector('[data-q="clv"]'),
      ok: function () {
        var v = (numInput ? numInput.value : "").replace(/[^\d]/g, "");
        return v !== "" && +v > 0;
      },
    },
  ];
  if (contacts[0]) checks.push({ el: contacts[0], ok: function () { return contacts[0].querySelector("input").value.trim() !== ""; } });
  if (contacts[1]) checks.push({ el: contacts[1], ok: function () { return EMAIL_RE.test(contacts[1].querySelector("input").value.trim()); } });
  if (contacts[2]) checks.push({ el: contacts[2], ok: function () { return URL_RE.test(contacts[2].querySelector("input").value.trim()); } });

  function allValid() {
    return checks.every(function (c) { return !c.el || c.ok(); });
  }

  function refreshButton() {
    if (submit) submit.classList.toggle("is-active", allValid());
  }

  // showAll=true — валідуємо всі поля; інакше лише вже підсвічені (жива очистка)
  function validate(showAll) {
    checks.forEach(function (c) {
      if (!c.el) return;
      if (showAll || c.el.classList.contains("is-error")) {
        c.el.classList.toggle("is-error", !c.ok());
      }
    });
    refreshButton();
  }

  // Радіо: підсвічуємо вибрану кнопку (клас is-checked)
  form.querySelectorAll('.quote_radio input[type="radio"]').forEach(function (input) {
    input.addEventListener("change", function () {
      form
        .querySelectorAll('.quote_radio input[name="' + input.name + '"]')
        .forEach(function (i) {
          i.closest(".quote_radio").classList.toggle("is-checked", i.checked);
        });
    });
  });

  // Степер числа (CLV): +/- 1000
  form.querySelectorAll(".quote_num-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!numInput) return;
      var val = parseInt(numInput.value.replace(/[^\d]/g, ""), 10) || CLV_MIN;
      val += btn.dataset.step === "up" ? CLV_STEP : -CLV_STEP;
      val = clampClv(val);
      numInput.value = val.toLocaleString("en-US");
      validate(false);
    });
  });

  // Обмежуємо CLV діапазоном при ручному вводі (клампимо на blur/change)
  if (numInput) {
    numInput.addEventListener("change", function () {
      numInput.value = clampClv(numInput.value).toLocaleString("en-US");
    });
  }

  // Слайдер close rate ↔ поле "%": двосторонній зв'язок
  if (range) {
    // syncPct=false — не перезаписуємо поле, поки користувач у ньому друкує
    var paintRange = function (syncPct) {
      var v = +range.value;
      range.style.background =
        "linear-gradient(90deg, #ddd1ff 0%, #ddd1ff " + v + "%, #ececec " + v + "%, #ececec 100%)";
      if (pct && syncPct !== false) pct.value = v;
    };

    // Слайдер → поле
    range.addEventListener("input", function () { paintRange(true); });

    // Поле → слайдер: чистимо до цифр, клампимо 0–100, рухаємо слайдер
    if (pct) {
      pct.addEventListener("input", function () {
        var digits = pct.value.replace(/[^\d]/g, "");
        var v = digits === "" ? 0 : Math.min(100, parseInt(digits, 10));
        range.value = v;
        paintRange(false); // залишаємо введене як є, лише перефарбовуємо слайдер
      });
      // На blur/зміні нормалізуємо поле до реального значення слайдера
      pct.addEventListener("change", function () { pct.value = range.value; });
      pct.addEventListener("blur", function () { pct.value = range.value; });
    }

    paintRange(true);
  }

  // Показуємо помилку поля на blur
  form.addEventListener("focusout", function (e) {
    var host = e.target.closest("[data-q], .quote_control");
    if (!host) return;
    var c = checks.find(function (x) { return x.el === host; });
    if (c) host.classList.toggle("is-error", !c.ok());
  });

  // Жива очистка помилок + оновлення кнопки при вводі/зміні
  form.addEventListener("input", function () { validate(false); });
  form.addEventListener("change", function () { validate(false); });

  // Клік по кнопці: показати всі помилки, доскролити до першої
  if (submit) {
    submit.addEventListener("click", function (e) {
      e.preventDefault();
      validate(true);
      if (allValid()) {
        // TODO: реальна відправка форми
      } else {
        var firstErr = form.querySelector(".is-error");
        if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  refreshButton();
})();

// REVIEWS: відео-модалка (клік по .reviews_video відкриває data-video) ----
(function () {
  var TRIGGER =
    ".reviews_video[data-video], .hero-inner_list-item-lightbox[data-video], .item_footer-head-right[data-video]";
  if (!document.querySelector(TRIGGER)) return;

  // YouTube watch / youtu.be / embed → embed з autoplay
  function toEmbed(url) {
    var m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    var id = m ? m[1] : "";
    return "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
  }

  // Модалка (перевикористовує стилі .carousel_modal), незалежна від carousel.js
  var modal = document.createElement("div");
  modal.className = "carousel_modal reviews_modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML =
    '<div class="carousel_modal-top">' +
    '<button class="carousel_modal-close" type="button" aria-label="Close">' +
    '<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M6.13268 18.2077L4.79102 16.866L10.1577 11.4993L4.79102 6.13268L6.13268 4.79102L11.4993 10.1577L16.866 4.79102L18.2077 6.13268L12.841 11.4993L18.2077 16.866L16.866 18.2077L11.4993 12.841L6.13268 18.2077Z" fill="white"/>' +
    "</svg></button></div>" +
    '<div class="carousel_modal-body">' +
    '<div class="carousel_modal-video"></div>' +
    '<a class="carousel_modal-cta" href="#"><span>Apply For Free Pilot</span>' +
    '<span class="carousel_modal-cta-arrow">' +
    '<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M5.30078 9.8901H15.4167M11.3703 13.9364L15.4167 9.8901L11.3703 5.84375" stroke="#101011" stroke-width="1.2139" stroke-linecap="square" stroke-linejoin="round"/>' +
    "</svg></span></a></div>";
  document.body.appendChild(modal);

  var videoBox = modal.querySelector(".carousel_modal-video");
  var isOpen = false;

  function open(url) {
    videoBox.innerHTML =
      '<iframe src="' + toEmbed(url) +
      '" title="Video review" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    isOpen = true;
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    isOpen = false;
    setTimeout(function () { videoBox.innerHTML = ""; }, 350);
  }

  // Делегування (document): reviews (у т.ч. після "Load More") + hero + футер
  document.addEventListener("click", function (e) {
    var v = e.target.closest(TRIGGER);
    if (v) {
      // Тригер у футері — це <a href="#">, тож гасимо стрибок сторінки.
      if (v.tagName === "A") e.preventDefault();
      open(v.dataset.video);
    }
  });

  modal.querySelector(".carousel_modal-close").addEventListener("click", close);

  // CTA "Apply For Free Pilot" усередині модалки: закриваємо модалку й
  // миттєво скролимо до секції-форми (як звичайні .cta-main нижче).
  modal.querySelector(".carousel_modal-cta").addEventListener("click", function (e) {
    e.preventDefault();
    close();
    var target = document.querySelector(".campaign");
    if (!target) return;
    var header = document.querySelector(".header");
    var offset = header ? header.offsetHeight : 0;
    var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo(0, y); // миттєво (instant)
  });

  modal.addEventListener("click", function (e) {
    if (!e.target.closest(".carousel_modal-video, .carousel_modal-cta")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) close();
  });
})();

// HERO: glitch fade-in карток по колу (кожні 10с) ------------------------
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".hero-inner .hero-inner_list-item:not(.center)")
  );
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.addEventListener("animationend", function () {
      card.classList.remove("is-glitch");
    });
  });

  // Хвиля: картки glitch-яться по черзі зі стагером
  function glitchWave() {
    cards.forEach(function (card, idx) {
      setTimeout(function () {
        card.classList.remove("is-glitch");
        void card.offsetWidth; // рестарт анімації
        card.classList.add("is-glitch");
      }, idx * 150);
    });
  }

  setTimeout(glitchWave, 1500);
  setInterval(glitchWave, 10000);
})();

// CTA-MAIN: клік → миттєвий скрол до секції campaign (форма-заявка) -------
(function () {
  var target = document.querySelector(".campaign");
  if (!target) return;
  var header = document.querySelector(".header");

  document.querySelectorAll(".cta-main").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var offset = header ? header.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, y); // миттєво (instant)
    });
  });
})();

// CONGRATS: копіювання тексту повідомлення (по блоку і по кнопці) --------
(function () {
  var box = document.querySelector(".hero-congrats_steps-text-copy");
  var btn = document.querySelector(".hero-congrats_steps-text-copy-btn");
  if (!box) return;

  function getText() {
    var p = box.querySelector("p");
    return (p ? p.textContent : box.textContent).trim().replace(/\s+/g, " ");
  }

  // Резерв для file:// та старих браузерів, де немає navigator.clipboard
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (_) {}
    document.body.removeChild(ta);
  }

  // Кастомний тост замість нативного alert
  var toast = null;
  var toastTimer = null;

  function showToast() {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "copy-toast";
      toast.setAttribute("role", "status");
      toast.innerHTML =
        '<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M8.4 13.9L4.9 10.4L3.7 11.6L8.4 16.3L17.3 7.4L16.1 6.2L8.4 13.9Z" fill="#FFFFFF"/>' +
        "</svg>" +
        '<p class="text-label-medium">Text Copied !</p>';
      document.body.appendChild(toast);
    }

    // Рестарт анімації, якщо тост іще на екрані з минулого кліку
    clearTimeout(toastTimer);
    void toast.offsetWidth;
    toast.classList.add("is-visible");

    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  function copy(withToast) {
    var text = getText();
    var done = function () {
      if (withToast) showToast();
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  }

  box.addEventListener("click", function () { copy(true); });
  if (btn) btn.addEventListener("click", function () { copy(true); });
})();

// CTA-MAIN: клік → миттєвий скрол до секції campaign (форма-заявка) -------
(function () {
  var target = document.querySelector(".campaign");
  if (!target) return;
  var header = document.querySelector(".header");

  document.querySelectorAll(".cta-main").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var offset = header ? header.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo(0, y); // миттєво (instant)
    });
  });
})();

// CONGRATS: інлайн-програвання відео (клік по прев'ю → вбудований iframe) ---
(function () {
  var SEL = ".hero-congrats_steps-video[data-video], .hero-congrats_steps-item-video[data-video]";
  if (!document.querySelector(SEL)) return;

  function toEmbed(url) {
    var m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    return "https://www.youtube.com/embed/" + (m ? m[1] : "") + "?autoplay=1&rel=0";
  }

  // Делегування: працює і для елементів, доданих після рендера
  document.addEventListener("click", function (e) {
    var box = e.target.closest(SEL);
    if (!box || box.dataset.playing) return;
    box.dataset.playing = "1";
    box.classList.add("is-playing");
    box.innerHTML =
      '<iframe src="' + toEmbed(box.dataset.video) +
      '" title="Video" frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
  });
})();
