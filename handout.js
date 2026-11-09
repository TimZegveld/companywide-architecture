'use strict';
const { kata } = window.WORKSHOP;
for (const key of ['title', 'description']) document.getElementById(`kata-${key}`).textContent = kata[key];
document.querySelector('#kata-challenge b').textContent = kata.challenge;
document.getElementById('kata-questions').replaceChildren(...kata.questions.map(question => Object.assign(document.createElement('li'), { textContent: question })));

const collaboration = document.createElement('section');
collaboration.style.cssText = 'border-top:2px solid #aadb1e;margin-top:12px;padding-top:10px;break-inside:avoid';
collaboration.innerHTML = '<h2 style="font-size:14px">Zo werken we samen</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px"><p style="font-size:10px;line-height:1.45;margin:0"><b>1 · Kies wie start</b><br>Laat bij voorkeur iemand met minder of geen architectuurervaring beginnen.</p><p style="font-size:10px;line-height:1.45;margin:0"><b>2 · Vraag, niet invullen</b><br>Ervaren collega’s beantwoorden vragen, maar nemen de stift niet over.</p><p style="font-size:10px;line-height:1.45;margin:0"><b>3 · Geef door</b><br>Is de starter klaar? Dan mag de volgende persoon aanvullen of aanpassen.</p></div><p style="font-size:10px;margin:8px 0 0"><b>Verboden om te zeggen:</b> “We doen het altijd zo.”</p>';
document.querySelector('.bottom').before(collaboration);
