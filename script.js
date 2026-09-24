const clockEl = document.getElementById("live-clock");
const dateEl = document.getElementById("live-date");
const footerClockEl = document.getElementById("footer-clock");
const footerDateEl = document.getElementById("footer-date");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

function formatTimeWithoutSeconds(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `[ ${hours}:${minutes} ${ampm} ]`;
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

function tickClock() {
  const now = new Date();
  const timeFormatted = formatTimeWithoutSeconds(now);
  const dateFormatted = dateFmt.format(now);

  if (clockEl) {
    clockEl.textContent = timeFormatted;
    clockEl.setAttribute("datetime", now.toISOString());
  }
  if (dateEl) {
    dateEl.textContent = dateFormatted;
  }
  if (footerClockEl) {
    footerClockEl.textContent = timeFormatted;
  }
  if (footerDateEl) {
    footerDateEl.textContent = dateFormatted;
  }
}

tickClock();
setInterval(tickClock, 1000);

function setMenu(open) {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.toggle("hidden", !open);
  if (iconOpen) iconOpen.classList.toggle("hidden", open);
  if (iconClose) iconClose.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    setMenu(mobileMenu.classList.contains("hidden"));
  });
}

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => {
  if (section) spy.observe(section);
});
