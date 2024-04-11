import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import WaveSurfer from 'wavesurfer.js';

const slidesMessengers = document.querySelectorAll('.reviews-messengers__slide');
const popupMessengers = document.querySelector('.reviews-messengers__popup');

const slidesLetters = document.querySelectorAll('.reviews-letters__slide');
const popupLetters = document.querySelector('.reviews-letters__popup');

const audios = document.querySelectorAll('.reviews-audio__slide');

const reviewsTabs = new Swiper('.reviews__tabs', {
  modules: [FreeMode],
  slidesPerView: 'auto',
  freeMode: true,
  watchOverflow: true,
});

if (slidesMessengers.length) {
  slidesMessengers.forEach((slide) => {
    const link = slide.querySelector('.reviews-messengers__slide-link');

    link.addEventListener('click', () => {
      getPopupMessengers(slide);
    });
  });
}

function getPopupMessengers(slide) {
  const popupTitle = popupMessengers.querySelector('.reviews-messengers__popup-title');
  const popupDescription = popupMessengers.querySelector('.reviews-messengers__popup-description');
  const popupTags = popupMessengers.querySelector('.reviews-messengers__popup-tags');
  const popupImg = popupMessengers.querySelector('img');

  popupTitle.innerText = slide.querySelector('.reviews-messengers__slide-title').innerText;
  popupDescription.innerText = slide.querySelector('.reviews-messengers__slide-description').innerText;
  popupTags.innerHTML = slide.querySelector('.reviews-messengers__slide-tags').innerHTML;
  popupImg.src = slide.querySelector('img').src;

  Fancybox.show([{ src: "#reviews-messengers-popup", type: "inline" }]);
}

if (slidesLetters.length) {
  slidesLetters.forEach((slide) => {
    const link = slide.querySelector('.reviews-letters__slide-link');

    link.addEventListener('click', () => {
      getPopupLetters(slide);
    });
  });
}

function getPopupLetters(slide) {
  const popupTitle = popupLetters.querySelector('.reviews-letters__popup-title');
  const popupDescription = popupLetters.querySelector('.reviews-letters__popup-description');
  const popupTags = popupLetters.querySelector('.reviews-letters__popup-tags');
  const popupImg = popupLetters.querySelector('img');

  popupTitle.innerText = slide.querySelector('.reviews-letters__slide-title').innerText;
  popupDescription.innerText = slide.querySelector('.reviews-letters__slide-description').innerText;
  popupTags.innerHTML = slide.querySelector('.reviews-letters__slide-tags').innerHTML;
  popupImg.src = slide.querySelector('.reviews-letters__slide-img img').src;

  Fancybox.show([{ src: "#reviews-letters-popup", type: "inline" }]);
}

if (audios.length) {
  audios.forEach((file, index) => {
    const fileUrl = file.querySelector('.reviews-audio__slide-file').dataset.audio;
    const container = file.querySelector('.reviews-audio__slide-file');
    const buttonPlay = file.querySelector('.reviews-audio__slide-play');
    const currrentTime = file.querySelector('.reviews-audio__slide-timer--current');
    const overTime = file.querySelector('.reviews-audio__slide-timer--length');

    container.setAttribute('id', `audio-${index}`);

    const wavesurfer = WaveSurfer.create({
      container: `#audio-${index}`,
      waveColor: '#474949',
      progressColor: '#F8F1DF',
      url: fileUrl,
      height: 24,
      cursorWidth: 0,
    })

    buttonPlay.addEventListener('click', () => {
      wavesurfer.play();
    });

    wavesurfer.on('ready', function () {
      currrentTime.innerText = secondsToTimestamp(wavesurfer.getCurrentTime());
      overTime.innerText = secondsToTimestamp(wavesurfer.getDuration());
    });

    wavesurfer.on('audioprocess', function () {
      currrentTime.innerText = secondsToTimestamp(wavesurfer.getCurrentTime());
    });
  });
}

function secondsToTimestamp(seconds) {
  seconds = Math.floor(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds - (h * 3600)) / 60);
  var s = seconds - (h * 3600) - (m * 60);

  m = m < 10 ? m : m;
  s = s < 10 ? '0' + s : s;
  return m + ':' + s;
}