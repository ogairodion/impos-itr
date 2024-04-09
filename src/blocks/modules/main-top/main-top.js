import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

const mainTop = document.querySelector('.main-top');
const slidesProgress = mainTop.querySelector('.slider-navigation-progress');
const slidesProgressActive = slidesProgress.querySelector('.slider-navigation-progress__active');
const slidesProgressLength = slidesProgress.querySelector('.slider-navigation-progress__length');

const video = document.querySelector('video');

const mainTopSlider_1 = new Swiper('.main-top__slider-left', {
  modules: [Navigation, Pagination, EffectFade, Autoplay],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.main-top .slider-navigation-arrow--next',
    prevEl: '.main-top .slider-navigation-arrow--prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  speed: 1000,
  allowTouchMove: false,
  pagination: {
    el: '.main-top__slider-pagination',
    clickable: true,
  },
});

if (mainTopSlider_1) {
  slidesProgressLength.innerText = mainTopSlider_1.slides.length;

  mainTopSlider_1.on('slideChange', () => {
    slidesProgressActive.innerText = mainTopSlider_1.realIndex + 1;
  });
}

const mainTopSlider_2 = new Swiper('.main-top__slider-right', {
  modules: [Navigation, Pagination, EffectFade, Autoplay],
  slidesPerView: 1,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  allowTouchMove: false,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  speed: 1000,
  navigation: {
    nextEl: '.main-top .slider-navigation-arrow--next',
    prevEl: '.main-top .slider-navigation-arrow--prev',
  },
  pagination: {
    el: '.main-top__slider-scrollbar',
    type: 'progressbar',
  },
  loop: true,
});

const mainTopSlider_3 = new Swiper('.main-top__slider-mobile', {
  modules: [Navigation, Pagination],
  slidesPerView: 'auto',
  spaceBetween: 8,
  pagination: {
    el: '.main-top__slider-scrollbar',
    type: 'progressbar',
  },
  centeredSlides: true,
  loop: true,
});

if (video) {
  video.play();
}