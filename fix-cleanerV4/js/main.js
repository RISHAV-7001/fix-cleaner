/* =========================================================
   FIX CLEANER — GLOBAL INTERACTIONS
   Mobile navigation + smooth page behavior
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (!header || !toggle || !nav) return;

    const closeMenu = () => {
        header.classList.remove("mobile-nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
    };

    toggle.addEventListener("click", () => {
        const open = header.classList.toggle("mobile-nav-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
        if (window.innerWidth <= 900 && !header.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMenu();
    });
});
