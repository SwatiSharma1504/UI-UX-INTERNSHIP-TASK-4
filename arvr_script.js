// ============================================================
//  NEXUS AR/VR INTERFACE — script.js
// ============================================================

// ── 1. CUSTOM CURSOR ─────────────────────────────────────────
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur2.style.left = mx + 'px';
  cur2.style.top = my + 'px';
});

function animCursor() {
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('button, .mode-card, .spatial-card, .screen-card, .g-item, .orb-node, .orb-core, .hb-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});


// ── 2. STARFIELD ─────────────────────────────────────────────
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const sz = Math.random() * 2 + 0.5;
  s.style.cssText = `
    width:${sz}px; height:${sz}px;
    top:${Math.random() * 100}%;
    left:${Math.random() * 100}%;
    --d:${2 + Math.random() * 4}s;
    --del:${Math.random() * 4}s;
    opacity:${Math.random() * 0.5};
  `;
  starsEl.appendChild(s);
}


// ── 3. LIVE CLOCK ─────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 1000);


// ── 4. LIVE FPS COUNTER ───────────────────────────────────────
let lastT = performance.now(), frames = 0;
function updateFPS(t) {
  frames++;
  if (t - lastT >= 1000) {
    document.getElementById('fps').textContent = frames + ' FPS';
    frames = 0;
    lastT = t;
  }
  requestAnimationFrame(updateFPS);
}
requestAnimationFrame(updateFPS);


// ── 5. MODE TOGGLE (AR / VR / MR) ────────────────────────────
function setMode(btn, mode) {
  document.querySelectorAll('.hud-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const colors = { AR: '#00c8ff', VR: '#ffaa00', MR: '#00ffcc' };
  document.documentElement.style.setProperty('--cyan', colors[mode]);
}


// ── 6. GESTURE SWITCHER ───────────────────────────────────────
function setGesture(el, icon, name) {
  document.querySelectorAll('.g-item').forEach(i => i.classList.remove('active-g'));
  el.classList.add('active-g');
  document.getElementById('gestureIcon').textContent = icon;
  document.getElementById('gestureName').textContent = name;
}


// ── 7. GESTURE TABS ───────────────────────────────────────────
const gestureIcons = {
  hand:       { icon: '🤚', name: 'OPEN PALM — SELECT' },
  gaze:       { icon: '👁️', name: 'DWELL — ACTIVATE' },
  voice:      { icon: '🎤', name: 'VOICE — COMMAND' },
  controller: { icon: '🕹️', name: 'TRIGGER — FIRE' }
};

function switchGTab(btn, type) {
  document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const g = gestureIcons[type];
  document.getElementById('gestureIcon').textContent = g.icon;
  document.getElementById('gestureName').textContent = g.name;
}


// ── 8. GAZE TRACKING SIMULATION ──────────────────────────────
setInterval(() => {
  document.getElementById('pupilX').textContent =
    Math.round(Math.random() * 100 + 460) + ' px';
  document.getElementById('pupilY').textContent =
    Math.round(Math.random() * 60 + 354) + ' px';
}, 800);


// ── 9. SCROLL REVEAL ANIMATIONS ──────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.mode-card, .spatial-card, .screen-card, .principle-card, .g-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObs.observe(el);
});


// ── 10. SETTINGS TOGGLES ─────────────────────────────────────
document.querySelectorAll('.sp-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('on');
  });
});
