
const STONE_DURATION = 1500; // ms

let running = false;
let startTime = 0;
let pauseOffset = 0;

const stoneEl = document.getElementById('stone');
const toggleBtn = document.getElementById('toggle');

const audio = new Audio('stone_tick_soft.wav');
audio.volume = 0.18;

function update() {
  if (!running) return;
  const elapsed = Date.now() - startTime + pauseOffset;
  const stone = Math.floor(elapsed / STONE_DURATION);
  stoneEl.textContent = stone;
  requestAnimationFrame(update);
}

toggleBtn.addEventListener('click', async () => {
  if (!running) {
    await audio.play();
    audio.pause();
    startTime = Date.now();
    running = true;
    toggleBtn.textContent = 'STOP';
    tick();
  } else {
    running = false;
    pauseOffset += Date.now() - startTime;
    toggleBtn.textContent = 'START';
  }
});

function tick() {
  if (!running) return;
  audio.currentTime = 0;
  audio.play();
  setTimeout(tick, STONE_DURATION);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
