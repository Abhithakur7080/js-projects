//selectors
const resetBtn = document.querySelector("#reset");
const playBtn = document.querySelector("#play");
const timerElem = document.querySelector("#timer");
const root = document.querySelector(":root");

//initial values
const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
//initial functions
timerElem.innerText = formatTime(totalSeconds);
const timerInterval = setInterval(run, 1000);

//on click play handle
playBtn.addEventListener("click", () => {
  playing = !playing;
  //toggle play/pause style
  playBtn.classList.toggle("play");
  playBtn.classList.toggle("bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");
});
//on click reset handle
resetBtn.addEventListener("click", resetAll);

//running interval
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }
    //handle timer view
    timerElem.innerText = formatTime(currentSeconds);
    //handle pointer rotating view style
    root.style.setProperty("--degrees", calcDeg());
  }
}
//formated time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${newSeconds
    .toString()
    .padStart(2, "0")}`;
}
//degree calcultion for pointer rotating style
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}
//on click reset all timer handle
function resetAll() {
  playing = false;
  playBtn.classList.remove("play");
  playBtn.classList.remove("bg-green-500");
  const playIcon = playBtn.querySelector("i");
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  currentSeconds = totalSeconds;
  //after reset set initial values
  timerElem.innerText = formatTime(totalSeconds);
  //after reset set initial pointer position
  root.style.setProperty("--degrees", "0deg");
}
