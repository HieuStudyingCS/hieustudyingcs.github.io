

'use strict';

const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width = '50px';
    cursorRing.style.height = '50px';
    cursorRing.style.top = '-25px';
    cursorRing.style.left = '-25px';
    cursorRing.style.borderColor = 'rgba(0,212,255,0.7)';
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.8)`;
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.top = '-16px';
    cursorRing.style.left = '-16px';
    cursorRing.style.borderColor = 'rgba(0,212,255,0.5)';
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
  });
});


const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
const PARTICLE_COUNT = window.innerWidth < 768 ? 30 : 55;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: Math.random() * 1.8 + 0.5,
    alpha: Math.random() * 0.45 + 0.1,
    hue: Math.random() > 0.65 ? 192 : Math.random() > 0.5 ? 265 : 158, // cyan / purple / green
  };
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
}

function drawParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `hsla(${particles[i].hue}, 100%, 70%, ${(1 - dist / 130) * 0.08})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.4)`;
    ctx.fill();
    ctx.shadowBlur = 0;

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -5) p.x = canvas.width + 5;
    if (p.x > canvas.width + 5) p.x = -5;
    if (p.y < -5) p.y = canvas.height + 5;
    if (p.y > canvas.height + 5) p.y = -5;
  });

  requestAnimationFrame(drawParticles);
}

if (canvas) {
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}


const typeEl = document.getElementById('typewriter');
const roles = [
  'Aspiring AI Engineer',
  'CS Student at UIT',
  'Open to Internships',
  'Problem Solver',
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeWriter() {
  if (!typeEl) return;
  const current = roles[roleIdx];

  if (!isDeleting) {
    typeEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 55 : 90;
  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1400);


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
  updateActiveNav();
}, { passive: true });


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 160;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}


const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger.classList.contains('open')) {
    closeMenu();
  }
});


const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

const groups = {};
revealItems.forEach((item, i) => {
  const parent = item.parentElement;
  if (!groups[parent]) groups[parent] = [];
  groups[parent].push(item);
});

Object.values(groups).forEach(group => {
  group.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.095}s`;
  });
});

revealItems.forEach(item => revealObserver.observe(item));


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.12)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});


document.querySelectorAll('.skill-category, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = yRel * -5;
    const tiltY = xRel * 5;
    card.style.transform = `translateY(-4px) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});