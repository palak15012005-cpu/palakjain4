/* ===== Theme toggle (persisted) ===== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeIcon.innerHTML = t === 'dark'
    ? '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>'
    : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
  try{ localStorage.setItem('pj-theme', t); }catch(e){}
}
let saved = 'light';
try{ saved = localStorage.getItem('pj-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }catch(e){}
applyTheme(saved);
themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ===== Mobile nav ===== */
const burger = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.add('open'));
document.getElementById('closeMobileNav').addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ===== Typing animation ===== */
const roles = ["Diplomacy Expert","Python Developer","International Relations Professional","Advanced Excel Specialist","Policy Researcher"];
const typeTarget = document.getElementById('typeTarget');
let ri = 0, ci = 0, deleting = false;
function typeLoop(){
  const word = roles[ri];
  if(!deleting){
    ci++;
    typeTarget.textContent = word.slice(0, ci);
    if(ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    typeTarget.textContent = word.slice(0, ci);
    if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ===== Scroll reveal ===== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ===== Skills data + bars ===== */
const skills = [
  ["International Relations", 96], ["Diplomacy", 94], ["Python", 88], ["Advanced Excel", 92],
  ["MS Office", 90], ["Research", 93], ["Communication", 95], ["Leadership", 87],
  ["Project Management", 89], ["Data Analysis", 85], ["Problem Solving", 90], ["Strategic Planning", 91], ["Public Speaking", 88]
];
const skillsGrid = document.getElementById('skillsGrid');
skills.forEach(([name, pct]) => {
  const row = document.createElement('div');
  row.className = 'skill-row reveal';
  row.innerHTML = `<div class="skill-head"><span>${name}</span><span class="pct mono">${pct}%</span></div>
  <div class="bar-track"><div class="bar-fill" data-pct="${pct}"></div></div>`;
  skillsGrid.appendChild(row);
  io.observe(row);
});
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const fill = e.target.querySelector('.bar-fill');
      if(fill){ fill.style.width = fill.dataset.pct + '%'; }
      barIo.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-row').forEach(r => barIo.observe(r));

/* ===== Animated counters ===== */
const counters = document.querySelectorAll('.count');
const countIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        cur += step;
        if(cur >= target){ el.textContent = target; return; }
        el.textContent = cur;
        requestAnimationFrame(tick);
      };
      tick();
      countIo.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countIo.observe(c));

/* ===== Scroll-to-top ===== */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ===== Contact form (demo submit) ===== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  setTimeout(() => { btn.textContent = original; e.target.reset(); }, 2200);
});

/* ===== Resume buttons (placeholder) ===== */
document.getElementById('resumeBtnHero').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Add your resume PDF link here — replace the href on the "Download Resume" buttons.');
});

document.getElementById('year').textContent = new Date().getFullYear();
