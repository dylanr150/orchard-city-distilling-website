/* ===========================================
   main.js
   Shared scripts for nav behaviour, mobile
   menu, and scroll reveal animations.
   Include on every page before </body>.
=========================================== */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const nav        = document.getElementById('mainNav');
const hero       = document.querySelector('.hero');

/* ─────────────────────────────────────────
   MOBILE MENU — open / close
───────────────────────────────────────── */
function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  // Frost the nav when menu is open over the hero
  if (!nav.classList.contains('scrolled')) {
    nav.classList.add('menu-open');
  }
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  nav.classList.remove('menu-open');
}

// Hamburger toggle
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Close on nav link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close when clicking anywhere outside the menu or hamburger
document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
const reveals  = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   NAV — transparent over hero, solid after
───────────────────────────────────────── */
function updateNav() {
  // Pages without a hero (e.g. inner pages) stay solid
  if (!hero) {
    nav.classList.add('scrolled');
    return;
  }

  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const pastHero   = window.scrollY + nav.offsetHeight >= heroBottom;

  if (pastHero) {
    nav.classList.add('scrolled');
    nav.classList.remove('menu-open');
    mobileMenu.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
    mobileMenu.classList.remove('scrolled');
    // Re-apply frost if menu is still open
    if (mobileMenu.classList.contains('open')) {
      nav.classList.add('menu-open');
    }
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run once on load
