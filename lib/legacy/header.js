// Робить файл ES-модулем: інші файли в цій теці стали модулями через import.
export {};

// HEADER: бургер-меню ---------------------------------------------------
var header = document.querySelector(".header");
var burger = document.querySelector(".header_burger");

if (header && burger) {
  function closeMenu() {
    header.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", function () {
    var isOpen = header.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Клік по пункту меню / CTA закриває меню
  header
    .querySelectorAll(".header_menu-item-link, .header_cta, .header_cta-calendar")
    .forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

  // Повернулись на десктоп — прибираємо відкритий стан
  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) closeMenu();
  });
}
