// Images use picsum.photos (needs internet). Replace "src" with your own image paths if you like.
const images = [
  {src:'https://picsum.photos/seed/forest/900/675', cat:'nature', title:'Forest Path'},
  {src:'https://picsum.photos/seed/lake/900/675', cat:'nature', title:'Quiet Lake'},
  {src:'https://picsum.photos/seed/mountain/900/675', cat:'nature', title:'Mountain View'},
  {src:'https://picsum.photos/seed/skyline/900/675', cat:'city', title:'City Skyline'},
  {src:'https://picsum.photos/seed/street/900/675', cat:'city', title:'Busy Street'},
  {src:'https://picsum.photos/seed/bridge/900/675', cat:'city', title:'Old Bridge'},
  {src:'https://picsum.photos/seed/portrait/900/675', cat:'people', title:'Portrait'},
  {src:'https://picsum.photos/seed/crowd/900/675', cat:'people', title:'Festival Crowd'},
  {src:'https://picsum.photos/seed/friends/900/675', cat:'people', title:'Friends'},
  {src:'https://picsum.photos/seed/beach/900/675', cat:'nature', title:'Beach Sunset'},
  {src:'https://picsum.photos/seed/night/900/675', cat:'city', title:'Night Lights'},
  {src:'https://picsum.photos/seed/dance/900/675', cat:'people', title:'Dancers'}
];

const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
let visible = [];   // indexes currently shown
let current = 0;

images.forEach((img, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.cat = img.cat;
  card.dataset.index = i;
  card.innerHTML = `<img src="${img.src}" alt="${img.title}" loading="lazy"><span>${img.title}</span>`;
  card.addEventListener('click', () => openLightbox(i));
  grid.appendChild(card);
});

function updateVisible() {
  visible = [...grid.children].filter(c => !c.classList.contains('hide')).map(c => +c.dataset.index);
}
updateVisible();

document.getElementById('filters').addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  const f = e.target.dataset.filter;
  [...grid.children].forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
  updateVisible();
});

function show(i) {
  current = i;
  lbImg.src = images[i].src;
  lbImg.alt = images[i].title;
  lbCap.textContent = images[i].title;
}
function openLightbox(i) {
  show(i);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}
function step(dir) {
  const pos = visible.indexOf(current);
  show(visible[(pos + dir + visible.length) % visible.length]);
}

document.getElementById('next').addEventListener('click', () => step(1));
document.getElementById('prev').addEventListener('click', () => step(-1));
document.getElementById('close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
