const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '48px'; 
    ring.style.height = '48px';
    ring.style.top = '-24px'; 
    ring.style.left = '-24px';
    ring.style.borderColor = 'rgba(0,212,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '32px'; 
    ring.style.height = '32px';
    ring.style.top = '-16px'; 
    ring.style.left = '-16px';
    ring.style.borderColor = 'rgba(0,212,255,0.4)';
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.project-card, .skill-category').forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.08}s`;
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        setTimeout(() => {
          child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});