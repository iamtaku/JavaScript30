const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreenBtn = player.querySelector("[data-fullScreen]");

let mousedown = false;

const togglePlayer = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateBtn = () => {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
};

const skip = (event) => {
  const skipDuration = event.target.dataset.skip;
  video.currentTime += parseFloat(skipDuration);
};

const handleRangeUpdate = (event) => {
  const targetName = event.target.name;
  const targetValue = event.target.value;
  video[targetName] = targetValue;
};

const handleProgressUpdate = (event) => {
  console.log(video.currentTime);
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
};

const scrub = (event) => {
  const percent = event.offsetX / video.clientWidth;
  video.currentTime = video.duration * percent;
};

video.addEventListener("click", togglePlayer);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgressUpdate);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

toggle.addEventListener("click", togglePlayer);

skipButtons.forEach((btn) => btn.addEventListener("click", skip));
fullScreenBtn.addEventListener("click", () => video.requestFullscreen());

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
