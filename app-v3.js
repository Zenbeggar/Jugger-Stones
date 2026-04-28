
const STONE_DURATION = 1500; // ms

let running = false;
let startTime = 0;
let pauseOffset = 0;
let timerId = null;

const stoneEl = document.getElementById('stone');
const toggleBtn = document.getElementById('toggle');

const audio = new Audio('./StoneSmash.wav');
audio.volume = 0.18;

function start() {
  running = true;
  startTime = Date.now();
  toggleBtn.textContent = 'STOP';
  tick();
}

function stop() {
  running = false;
  pauseOffset += Date.now() - startTime;
  toggleBtn.textContent = 'START';
  clearTimeout(timerId);
}

function tick() {
  if (!running) return;

  // Stein zählen
  const elapsed = Date.now() - startTime + pauseOffset;
  stoneEl.textContent = Math.floor(elapsed / STONE_DURATION);

  // Sound (fehlertolerant)
  
if (audio.readyState >= 2) {
    try {
      audio.currentTime = 0;
      audio.play();
    } catch (e) {
      console.warn('Sound blocked');
    }
  }

  timerId = setTimeout(tick, STONE_DURATION);
}

toggleBtn.addEventListener('click', () => {
  if (!running) {
    start();
  } else {
    stop();
  }
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
