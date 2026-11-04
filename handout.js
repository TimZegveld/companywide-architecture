'use strict';
for (const key of ['title', 'description', 'challenge']) document.getElementById(`kata-${key}`).textContent = window.WORKSHOP.kata[key];

const collaboration = document.createElement('section');
collaboration.style.cssText = 'border-top:2px solid #aadb1e;margin-top:16px;padding-top:10px;break-inside:avoid';
collaboration.innerHTML = '<h2 style="font-size:14px">Zo werken we samen</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px"><p style="font-size:10px;line-height:1.45;margin:0"><b>1 · Kies wie start</b><br>Laat bij voorkeur iemand met minder of geen architectuurervaring beginnen.</p><p style="font-size:10px;line-height:1.45;margin:0"><b>2 · Vraag, niet invullen</b><br>Ervaren collega’s beantwoorden vragen, maar nemen de stift niet over.</p><p style="font-size:10px;line-height:1.45;margin:0"><b>3 · Geef door</b><br>Is de starter klaar? Dan mag de volgende persoon aanvullen of aanpassen.</p></div>';
document.querySelector('.bottom').before(collaboration);
