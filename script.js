"use strict";

let studyMin = localStorage.getItem("study") || 50;
let breakMin = localStorage.getItem("break") || 10;

let isStudy = true;
let timeLeft = studyMin * 60;
let timer = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const emojiEl = document.getElementById("emoji");

function updateDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timeEl.textContent = `${m}:${s.toString().padStart(2,"0")}`;
}

function start() {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      isStudy = !isStudy;
      timeLeft = (isStudy ? studyMin : breakMin) * 60;
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
  timeLeft = studyMin * 60;
  modeEl.textContent = "Study Time";
  updateDisplay();
}

document.getElementById("start").onclick = start;
document.getElementById("pause").onclick = pause;
document.getElementById("reset").onclick = reset;

document.getElementById("fullscreen").onclick = () => {
  document.documentElement.requestFullscreen();
};

document.getElementById("studyInput").onchange = e => {
  studyMin = e.target.value;
  localStorage.setItem("study", studyMin);
  reset();
};

document.getElementById("breakInput").onchange = e => {
  breakMin = e.target.value;
  localStorage.setItem("break", breakMin);
};

document.getElementById("emojiPicker").onchange = e => {
  emojiEl.textContent = e.target.value;
  localStorage.setItem("emoji", e.target.value);
};

updateDisplay();
