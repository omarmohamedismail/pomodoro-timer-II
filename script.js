let studyTime = 50 * 60;
let breakTime = 10 * 60;
let timeLeft = studyTime;
let isStudy = true;
let timer = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const player = document.getElementById("spotifyPlayer");

function update() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timeEl.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
}

function start() {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    update();
    if (timeLeft <= 0) {
      isStudy = !isStudy;
      timeLeft = isStudy ? studyTime : breakTime;
      modeEl.textContent = isStudy ? "Study Time" : "Break Time";
    }
  }, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  isStudy = true;
  timeLeft = studyTime;
  modeEl.textContent = "Study Time";
  update();
}

/* 🔥 THIS IS THE IMPORTANT FIX */
function loadSpotify() {
  const input = document.getElementById("spotifyLink").value.trim();
  if (!input) return;

  // Remove query params
  const clean = input.split("?")[0];

  // Extract type + id
  const match = clean.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);

  if (!match) {
    alert("Invalid Spotify link");
    return;
  }

  const type = match[1];
  const id = match[2];

  player.src = `https://open.spotify.com/embed/${type}/${id}`;
}

update();
