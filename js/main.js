const player = document.querySelector('.video-player');
const video = document.querySelector('.video-player__viewer');
const btnPlayMain = document.querySelector('.play-btn');
const controls = document.querySelector('.video-player__controls');
const btnPlay = document.querySelector('.play');
const btnStop = document.querySelector('.stop');
const btnVolume = document.querySelector('.volume-icon');
const btnSkip = document.querySelectorAll('[data-skip]');
const progressVolume = document.querySelector('.player-input-volume');
const progressVideo = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  btnPlayMain.classList.toggle('click-play');
  btnPlay.classList.toggle('toggle-icon');
};

const playStop = () => {
  video.pause();
  video.currentTime = 0;
  btnPlayMain.classList.remove('click-play');
  btnPlay.classList.remove('toggle-icon');
};

const progress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
  const checkEnd = () => {
    if (percent === 100) {
      playStop();
    }
  };
  checkEnd();
};

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}
btnSkip.forEach((btn) => btn.addEventListener('click', skip));

const checkMute = () => {
  if (video.volume === 0) {
    btnVolume.classList.add('volume-mute');
  } else {
    btnVolume.classList.remove('volume-mute');
  }
};
function changeVolume() {
  let volumeValue = this.value;
  video.volume = volumeValue / 100;
  this.style.background = `linear-gradient(to right, rgb(189, 174, 130) ${volumeValue}%, rgb(189, 174, 130) 3%, rgb(200, 200, 200) 3%, rgb(200, 200, 200) 100%)`;
  checkMute();
}

function toggleVolume() {
  if (video.volume > 0) {
    video.volume = 0;
    checkMute();
  } else {
    video.volume = progressVolume.value / 100;
    checkMute();
  }
}

function scrub(e) {
  video.currentTime = (e.offsetX / progressVideo.offsetWidth) * video.duration;
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', progress);
btnPlayMain.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
btnStop.addEventListener('click', playStop);
btnVolume.addEventListener('click', toggleVolume);
progressVolume.addEventListener('input', changeVolume);
progressVideo.addEventListener('click', scrub);
