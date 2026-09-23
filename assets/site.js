// Überschriften einmalig aufdecken, sobald sie ins Bild kommen
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('in');
    revealObserver.unobserve(entry.target);
  }
}, { rootMargin: '0px 0px -4% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Aktuellen Abschnitt in der Navigation markieren
const navLinks = new Map(
  [...document.querySelectorAll('.nav a[href^="#"]:not(.btn)')].map((a) => [a.getAttribute('href').slice(1), a])
);

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const link = navLinks.get(entry.target.id);
    if (!link) continue;
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'true');
    }
  }
}, { rootMargin: '-45% 0px -50% 0px' });

navLinks.forEach((_, id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});
