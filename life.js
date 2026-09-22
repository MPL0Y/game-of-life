const CELL = 10;
const canvas = document.getElementById('board');
// Cell count follows viewport width so a cell stays ~11 CSS px — tappable on a phone.
// ponytail: fixed at load; rotating just rescales the canvas rather than reflowing the grid.
const COLS = Math.max(24, Math.min(96, Math.round(canvas.clientWidth / 11)));
const ROWS = Math.round(COLS * 0.58);
const ctx = canvas.getContext('2d');
let grid = new Uint8Array(COLS * ROWS);
let gen = 0, timer = null;

const at = (x, y) => ((y + ROWS) % ROWS) * COLS + ((x + COLS) % COLS);

function step(g) {
  const next = new Uint8Array(g.length);
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++)
      if (dx || dy) n += g[at(x + dx, y + dy)];
    next[at(x, y)] = (n === 3 || (n === 2 && g[at(x, y)])) ? 1 : 0;
  }
  return next;
}

function fit() {
  const dpr = window.devicePixelRatio || 1;
  const scale = canvas.clientWidth / (COLS * CELL);
  canvas.width = COLS * CELL * scale * dpr;
  canvas.height = ROWS * CELL * scale * dpr;
  canvas.style.aspectRatio = (COLS * CELL) + ' / ' + (ROWS * CELL);
  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
  draw();
}

function draw() {
  ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
  ctx.fillStyle = '#e8e8e8';
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++)
    if (grid[at(x, y)]) ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
}

function count() { let n = 0; for (const c of grid) n += c; return n; }

function bump(el, value) {
  if (el.textContent === String(value)) return;
  el.classList.add('tick');
  requestAnimationFrame(() => {
    el.textContent = value;
    requestAnimationFrame(() => el.classList.remove('tick'));
  });
}

function stats() {
  bump(document.getElementById('gen'), gen);
  bump(document.getElementById('live'), count());
}

function advance() { grid = step(grid); gen++; draw(); stats(); }

function paint(e) {
  const r = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - r.left) / r.width * COLS);
  const y = Math.floor((e.clientY - r.top) / r.height * ROWS);
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;
  grid[at(x, y)] = 1;
  draw();
  stats();
}

canvas.addEventListener('pointerdown', e => { canvas.setPointerCapture(e.pointerId); paint(e); });
canvas.addEventListener('pointermove', e => { if (e.buttons) paint(e); });

const toggle = document.getElementById('toggle');
toggle.onclick = () => {
  if (timer) { clearInterval(timer); timer = null; toggle.textContent = 'Start'; }
  else { timer = setInterval(advance, 80); toggle.textContent = 'Pause'; }
};
document.getElementById('step').onclick = advance;
document.getElementById('random').onclick = () => {
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.28 ? 1 : 0;
  gen = 0; draw(); stats();
};
document.getElementById('clear').onclick = () => {
  grid.fill(0); gen = 0; draw(); stats();
};

addEventListener('resize', fit);
stats();
fit();

// self-check: blinker oscillates, block is still. open with #test
if (location.hash === '#test') {
  const g = new Uint8Array(COLS * ROWS);
  [[1,0],[1,1],[1,2]].forEach(([x,y]) => g[at(x,y)] = 1);
  const a = step(g);
  console.assert(a[at(0,1)] && a[at(1,1)] && a[at(2,1)] && !a[at(1,0)], 'blinker failed');
  const b = new Uint8Array(COLS * ROWS);
  [[5,5],[6,5],[5,6],[6,6]].forEach(([x,y]) => b[at(x,y)] = 1);
  console.assert(step(b).every((v, i) => v === b[i]), 'block failed');
  console.log('self-check done');
}
