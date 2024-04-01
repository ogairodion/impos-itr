import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.rewards');
const slides = parent.querySelectorAll('.swiper-slide');
const slidesLength = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');

slidesLength.innerText = slides.length;

const rewardsSlider = new Swiper('.rewards__slider', {
  modules: [Navigation],
  slidesPerView: 'auto',
  spaceBetween: 18,
  navigation: {
    nextEl: '.rewards .slider-navigation-arrow--next',
    prevEl: '.rewards .slider-navigation-arrow--prev',
  },
  on: {
    slideChange: function () {
      slidesActive.innerText = this.realIndex + 1;
    },
  },
});

if (rewardsSlider) {
  slidesActive.innerText = rewardsSlider.realIndex + 1;
}