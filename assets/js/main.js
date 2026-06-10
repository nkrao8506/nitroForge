window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

const emberContainer = document.getElementById('embers');
for (let i = 0; i < 25; i++) {
  const e = document.createElement('div');
  e.className = 'ember';
  e.style.left = Math.random() * 100 + '%';
  e.style.width = e.style.height = (Math.random() * 3 + 1) + 'px';
  e.style.animationDuration = (Math.random() * 8 + 6) + 's';
  e.style.animationDelay = (Math.random() * 8) + 's';
  const hue = Math.random() > 0.5 ? 'rgba(255,69,0,' : 'rgba(201,168,76,';
  e.style.background = hue + (Math.random() * 0.5 + 0.5) + ')';
  emberContainer.appendChild(e);
}

function updateCountdown() {
  const target = new Date('2027-01-20T08:00:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) { return; }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const reveals = document.querySelectorAll('.reveal, .tl-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

const progressObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
      progressObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const vehicleSection = document.getElementById('vehicle');
if (vehicleSection) progressObs.observe(vehicleSection);

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

function openPartnerModal() {
  document.getElementById('partnerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePartnerModal() {
  document.getElementById('partnerModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.querySelector('span').textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #2a7a2a, #3a9a3a)';
  setTimeout(() => {
    btn.querySelector('span').textContent = 'Send Message →';
    btn.style.background = '';
  }, 3000);
}
