'use strict';
for (const key of ['title', 'description', 'challenge']) document.getElementById(`kata-${key}`).textContent = window.WORKSHOP.kata[key];
