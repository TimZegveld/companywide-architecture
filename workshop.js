// Pas hier de inhoud aan; het deck heeft geen buildstap nodig.
window.WORKSHOP = {
  date: 'Vrijdag 6 november 2026',
  groups: [
    { name: 'Groep 1', people: ['Tim', 'Vince', 'Danny', 'Joeri'], room: 'Vijver' },
    { name: 'Groep 2', people: ['Jacco', 'Kevin', 'Jeffrey', 'Stefan'], room: 'Ballenbak' },
    { name: 'Groep 3', people: ['Jan', 'Youri', 'Laura', 'Paul'], room: 'Skybox' },
    { name: 'Groep 4', people: ['Leon', 'Remco', 'Bram', 'Nicole', 'Jeroen'], room: 'Starbucks' }
  ],
  facilitator: { name: 'Sofie', role: 'PO', activity: 'Wisselt tussen de locaties' },
  kata: {
    title: 'Een partij bloemen, één betrouwbare bestelling',
    description: 'Een kweker biedt beschikbare partijen bloemen aan. Een koper ziet het aanbod en bestelt een hoeveelheid voor een gewenste leverdatum. De kweker bevestigt de bestelling.',
    challenge: 'Twee kopers kunnen tegelijk dezelfde partij bestellen. Hoe voorkom je dat je meer verkoopt dan beschikbaar is?',
    questions: ['Wanneer is een bestelling definitief?', 'Wat gebeurt er bij onvoldoende voorraad?', 'Wie moet weten dat een bestelling is bevestigd?']
  }
};
