'use strict';
const config = window.WORKSHOP;
const slides = [...document.querySelectorAll('.slide')];
const $ = id => document.getElementById(id);
document.querySelectorAll('[data-date]').forEach(el => el.textContent = config.date);
for (const key of ['title', 'description', 'challenge']) {
  const target = document.querySelector(`[data-kata-${key}]`);
  if (target) target.textContent = config.kata[key];
}
const groups = $('groups');
groups.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:35px';
for (const group of config.groups) {
  const card = document.createElement('article');
  card.style.cssText = 'min-height:230px;border-top:8px solid #aadb1e;padding:22px 18px;background:#fff;display:flex;flex-direction:column';
  const name = document.createElement('span'); name.textContent = group.name; name.style.cssText = 'font-size:18px;letter-spacing:.05em;text-transform:uppercase';
  const room = document.createElement('strong'); room.textContent = group.room; room.style.cssText = 'font-size:31px;font-weight:500;line-height:1.15;margin-top:16px';
  const people = document.createElement('span'); people.textContent = group.people.join(' · '); people.style.cssText = 'font-size:20px;line-height:1.45;margin-top:auto;padding-top:20px';
  card.append(name, room, people); groups.append(card);
  card.style.animation = `deck-rise .65s ${0.10 + groups.children.length * 0.14}s ease both`;
}
const facilitator = document.createElement('div');
facilitator.style.cssText = 'grid-column:1 / -1;display:grid;grid-template-columns:165px 1fr;gap:24px;padding:19px 24px;margin-top:4px;background:#aadb1e;align-items:center';
for (const [tag, value, style] of [['strong', config.facilitator.name, 'font-size:28px;font-weight:500'], ['span', `${config.facilitator.role} · ${config.facilitator.activity}`, 'font-size:21px']]) {
  const el = document.createElement(tag); el.textContent = value; el.style.cssText = style; facilitator.append(el);
}
groups.append(facilitator);
facilitator.style.animation = 'deck-rise .65s .78s ease both';
// Hergebruik de voorbeelddiagrammen uit de C4-uitleg op de check-in-slides (met unieke marker-id's).
document.querySelectorAll('[data-example]').forEach((figure, n) => {
  const svg = document.getElementById(figure.dataset.example).cloneNode(true);
  svg.removeAttribute('id');
  svg.querySelectorAll('marker[id]').forEach(marker => {
    const old = marker.id; marker.id = `${old}-${n}`;
    svg.querySelectorAll(`[marker-end="url(#${old})"]`).forEach(el => el.setAttribute('marker-end', `url(#${marker.id})`));
  });
  figure.append(svg);
});
let current = 0;
function resize() { document.documentElement.style.setProperty('--scale', Math.min(innerWidth / 1600, Math.max(1, innerHeight - 56) / 900)); }
function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => { slide.classList.toggle('active', i === current); slide.setAttribute('aria-hidden', String(i !== current)); });
  document.body.dataset.slide = current + 1;
  $('counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  $('progress').style.width = `${(current + 1) / slides.length * 100}%`;
  document.querySelector('.slide-footer').style.color = slides[current].classList.contains('dark') ? '#fff' : '#1d1d1b';
  $('speaker-content').textContent = slides[current].querySelector('.notes').textContent;
  $('prev').disabled = current === 0; $('next').disabled = current === slides.length - 1;
  document.title = `${current + 1}. ${slides[current].dataset.title} — jem-id`;
  history.replaceState(null, '', `#${current + 1}`);
}
function fromHash() { const n = Number(location.hash.slice(1)); show(Number.isInteger(n) && n >= 1 && n <= slides.length ? n - 1 : 0); }
function togglePanel(id) { $(id).hidden = !$(id).hidden; if (id === 'speaker') $('notes-toggle').setAttribute('aria-pressed', String(!$(id).hidden)); }
function closePanel(id) { const el = $(id); if (el instanceof HTMLDialogElement) el.close(); else el.hidden = true; if (id === 'speaker') $('notes-toggle').setAttribute('aria-pressed', 'false'); }
async function fullscreen() { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { $('fullscreen').textContent = 'Gebruik F11 voor volledig scherm'; } }
$('prev').onclick = () => show(current - 1); $('next').onclick = () => show(current + 1);
$('notes-toggle').onclick = () => togglePanel('speaker'); $('timer-toggle').onclick = () => togglePanel('timer');
$('prep-toggle').onclick = () => $('prep').showModal(); $('help-toggle').onclick = () => $('help').showModal(); $('fullscreen').onclick = fullscreen;
document.querySelectorAll('[data-close]').forEach(el => el.onclick = () => closePanel(el.dataset.close));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { ['speaker', 'timer', 'prep', 'help'].forEach(closePanel); return; }
  if (event.target.matches('input,textarea,select') || document.querySelector('dialog[open]') || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === ' ' && event.target.matches('button,a')) return;
  const key = event.key.toLowerCase();
  if (['arrowright', 'arrowdown', ' ', 'pagedown'].includes(key)) { event.preventDefault(); show(current + 1); }
  else if (['arrowleft', 'arrowup', 'pageup'].includes(key)) { event.preventDefault(); show(current - 1); }
  else if (/^\d$/.test(key) && Number(key) >= 1 && Number(key) <= slides.length) show(Number(key) - 1);
  else if (key === 'home') show(0); else if (key === 'end') show(slides.length - 1);
  else if (key === 'n') togglePanel('speaker'); else if (key === 't') togglePanel('timer');
  else if (key === 'f') fullscreen(); else if (key === '?') $('help').showModal();
});
let touchStart;
$('stage').addEventListener('touchstart', e => { touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }; }, { passive: true });
$('stage').addEventListener('touchend', e => { if (!touchStart) return; const dx = e.changedTouches[0].clientX - touchStart.x, dy = e.changedTouches[0].clientY - touchStart.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1)); touchStart = null; }, { passive: true });
let remaining = 1200, deadline = null;
function drawTimer() {
  if (deadline !== null) { remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); if (remaining === 0) { deadline = null; $('timer-start').textContent = 'Start'; $('timer-status').textContent = 'Tijd is om'; } }
  $('time').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  $('timer').classList.toggle('expired', remaining === 0);
}
function resetTimer() { const minutes = Math.max(1, Math.min(180, Number($('minutes').value) || 20)); $('minutes').value = minutes; remaining = Math.round(minutes * 60); deadline = null; $('timer-start').textContent = 'Start'; $('timer-status').textContent = 'Klaar om te starten'; drawTimer(); }
$('timer-start').onclick = () => { if (deadline !== null) { drawTimer(); deadline = null; $('timer-start').textContent = 'Verder'; $('timer-status').textContent = 'Gepauzeerd'; } else { if (remaining === 0) resetTimer(); deadline = Date.now() + remaining * 1000; $('timer-start').textContent = 'Pauze'; $('timer-status').textContent = 'Timer loopt'; } drawTimer(); };
$('timer-reset').onclick = resetTimer; $('minutes').onchange = resetTimer;
document.querySelectorAll('[data-minutes]').forEach(el => el.onclick = () => { $('minutes').value = el.dataset.minutes; resetTimer(); });
setInterval(drawTimer, 200); addEventListener('resize', resize); addEventListener('hashchange', fromHash); resize(); fromHash();
