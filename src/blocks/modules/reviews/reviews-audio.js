import Swiper from 'swiper';
import { Navigation, Grid } from 'swiper/modules';
import WaveSurfer from 'wavesurfer.js';

const parent = document.querySelector('.reviews-audio');

if (parent) {
  const slides = document.querySelectorAll('.reviews-audio__slide');
  const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
  const slidesActive = parent.querySelector('.slider-navigation-progress__active');
  const sliderNavigation = parent.querySelector('.slider-navigation');

  let windowWidth = 0;
  windowWidth = window.innerWidth;

  if (slides.length) {
    slides.forEach((file, index) => {
      const fileUrl = file.querySelector('.reviews-audio__slide-file').dataset.audio;
      const container = file.querySelector('.reviews-audio__slide-file');
      const buttonPlay = file.querySelector('.reviews-audio__slide-play');
      const buttonPause = file.querySelector('.reviews-audio__slide-pause');
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
        buttonPlay.classList.add('hidden');
        buttonPause.classList.remove('hidden');

        wavesurfer.play();
      });

      buttonPause.addEventListener('click', () => {
        buttonPlay.classList.remove('hidden');
        buttonPause.classList.add('hidden');

        wavesurfer.pause();
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

  if (windowWidth < 1200) {
    sliderNavigation.classList.add('slider-navigation--default-reverse');
    sliderNavigation.classList.remove('slider-navigation--vertical');
  } else {
    sliderNavigation.classList.add('slider-navigation--vertical');
    sliderNavigation.classList.remove('slider-navigation--default-reverse');
  }

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;

    if (windowWidth < 1200) {
      sliderNavigation.classList.add('slider-navigation--default-reverse');
      sliderNavigation.classList.remove('slider-navigation--vertical');
    } else {
      sliderNavigation.classList.add('slider-navigation--vertical');
      sliderNavigation.classList.remove('slider-navigation--default-reverse');
    }
  });

  slidesCurrent.innerText = slides.length;
  slidesActive.innerText = 1;

  const reviewsAudioSlider = new Swiper('.reviews-audio__slider', {
    modules: [Navigation, Grid],
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
      nextEl: '.reviews-audio .slider-navigation-arrow--next',
      prevEl: '.reviews-audio .slider-navigation-arrow--prev',
    },
    grid: {
      rows: 2,
    },
    centeredSlides: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    observeParents: true,
    observer: true,
    breakpoints: {
      1200: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        allowTouchMove: false,
        centeredSlides: false,
      },
    },
  });


  if (reviewsAudioSlider) {
    reviewsAudioSlider.on('slideChange ', () => {
      const realIndex = reviewsAudioSlider.realIndex + 1;
      slidesActive.innerText = realIndex <= 1 ? realIndex : realIndex + 1;
    });
  }
}