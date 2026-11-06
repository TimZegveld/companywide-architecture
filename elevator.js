'use strict';
// Doorsnede van een gebouw met lift, naar het voorbeeld in Randy Vroegops deck
// (https://github.com/vroegop/architecturetalk), gebaseerd op Gregor Hohpes Architect Elevator.
// De liftkooi gaat elke 1,8 s een verdieping hoger zolang de slide zichtbaar is.
(() => {
  const FLOORS = [
    ['Kelder', 'Ops & infrastructuur'],
    ['Machinekamer', 'Developers'],
    ['Verdieping 2', 'Seniors & architecten'],
    ['Verdieping 3', 'Product Owners'],
    ['Verdieping 4', 'Scrum Masters & org'],
    ['Penthouse', 'Management'],
  ];
  const fh = 112, top = 70, shaftX = 12, shaftW = 64, bodyX = 96, bodyW = 206, labelX = bodyX + bodyW + 26;
  const W = 640, H = top + FLOORS.length * fh + 16;
  const floorY = i => top + (FLOORS.length - 1 - i) * fh;
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent, text) => {
    const node = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (text) node.textContent = text;
    parent.append(node);
    return node;
  };

  for (const figure of document.querySelectorAll('[data-elevator]')) {
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Doorsnede van een gebouw met zes verdiepingen en een lift die langs alle verdiepingen gaat' }, figure);
    el('rect', { x: bodyX - 8, y: top - 40, width: bodyW + 16, height: FLOORS.length * fh + 48, rx: 6, class: 'lift-body' }, svg);
    el('rect', { x: shaftX, y: top - 40, width: shaftW, height: FLOORS.length * fh + 48, rx: 4, class: 'lift-shaft' }, svg);
    el('line', { x1: shaftX + shaftW / 2, y1: top - 40, x2: shaftX + shaftW / 2, y2: top + FLOORS.length * fh + 8, class: 'lift-cable' }, svg);
    const floors = FLOORS.map(([label, role], i) => {
      const y = floorY(i), g = el('g', { class: 'lift-floor' }, svg);
      el('line', { x1: bodyX - 8, y1: y + fh, x2: bodyX + bodyW + 8, y2: y + fh, class: 'lift-slab' }, g);
      for (let w = 0; w < 3; w++) el('rect', { x: bodyX + 22 + w * 60, y: y + 24, width: 42, height: 58, rx: 3, class: 'lift-win' }, g);
      el('text', { x: labelX, y: y + 48, class: 'lift-label' }, g, label);
      el('text', { x: labelX, y: y + 80, class: 'lift-role' }, g, role);
      return g;
    });
    const car = el('g', { class: 'lift-car' }, svg);
    el('rect', { x: shaftX + 8, y: 0, width: shaftW - 16, height: fh - 28, rx: 4, class: 'lift-car-frame' }, car);
    el('rect', { x: shaftX + 16, y: 10, width: shaftW - 32, height: fh - 48, rx: 2, class: 'lift-car-door' }, car);

    const slide = figure.closest('.slide');
    let idx = 0;
    const go = i => {
      idx = i;
      car.style.transform = `translateY(${floorY(i) + 14}px)`;
      floors.forEach((g, n) => g.classList.toggle('on', n === i));
    };
    go(0);
    setInterval(() => {
      if (!slide || slide.classList.contains('active')) go((idx + 1) % FLOORS.length);
      else if (idx !== 0) go(0); // terug naar de kelder, zodat de rit bij binnenkomst onderaan begint
    }, 1800);
  }
})();
