import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.rewards');

if (parent) {
  const slides = parent.querySelectorAll('.swiper-slide');
  const slidesLength = parent.querySelector('.slider-navigation-progress__length');
  const slidesActive = parent.querySelector('.slider-navigation-progress__active');

  let windowWidth = 0;
  windowWidth = window.innerWidth;
  slidesLength.innerText = slides.length;

  const rewardsSlider = new Swiper('.rewards__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 8,
    navigation: {
      nextEl: '.rewards .slider-navigation-arrow--next',
      prevEl: '.rewards .slider-navigation-arrow--prev',
    },
    centeredSlides: true,
    loop: true,
    on: {
      slideChange: function () {
        slidesActive.innerText = this.realIndex + 1;
      },
    },
    breakpoints: {
      1200: {
        centeredSlides: false,
        spaceBetween: 18,
        loop: false,
      },
    },
  });

  if (rewardsSlider) {
    slidesActive.innerText = rewardsSlider.realIndex + 1;
  }
}
