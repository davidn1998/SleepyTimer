const timeSettings = [60, 120, 180, 240, 300];
let timeIndex = 0;
let baseTime = timeSettings[timeIndex];

let timer;
let isPaused = true;
let secondsLeft = baseTime;
let timerEnded = false;

const timerText = document.querySelector("#timerText");
const sleepyIcon = document.querySelector("#sleepyIcon");
const buttonIcon = document.querySelector("#togglePlayButton");
const alarmAudio = document.querySelector("#alarmAudio");

const setTimerText = () => {
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) {
    secondsString = "0" + seconds;
  } else {
    secondsString = seconds;
  }

  if (minutes < 10) {
    minutesString = "0" + minutes;
  } else {
    minutesString = minutes;
  }

  timerText.innerHTML = minutesString + ":" + secondsString;
};

setTimerText();

const cycleTimer = () => {
  timeIndex = timeIndex === 4 ? 0 : timeIndex + 1;
  baseTime = timeSettings[timeIndex];
  secondsLeft = baseTime;
  setTimerText();
};

const togglePlayTimer = () => {
  if (isPaused) {
    playTimer();
  } else {
    pauseTimer();
  }
};

const updateTimer = () => {
  setTimerText();

  secondsLeft -= 1;

  if (secondsLeft < 0) {
    endTimer();
  }
};

const pauseTimer = () => {
  isPaused = true;
  clearInterval(timer);
  buttonIcon.innerHTML = '<i class="fas fa-play buttonIcon"></i>';
  sleepyIcon.src = "sleepy.png";
};

const playTimer = () => {
  if (timerEnded) resetTimer();
  isPaused = false;
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  buttonIcon.innerHTML = '<i class="fas fa-pause buttonIcon"></i>';
  sleepyIcon.src = "sleepyAwake.png";
};

const resetTimer = () => {
  timerEnded = false;
  secondsLeft = baseTime;
  pauseTimer();
  setTimerText();
};

const endTimer = () => {
  timerEnded = true;
  pauseTimer();
  alarmAudio.play();
  timerText.innerHTML = "SLEEP";
};
