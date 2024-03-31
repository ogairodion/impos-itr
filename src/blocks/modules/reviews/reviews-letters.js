import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.reviews-letters');
const slides = document.querySelectorAll('.reviews-letters__slide');
const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');

slidesCurrent.innerText = slides.length;
slidesActive.innerText = 1;

const reviewsLettersSlider = new Swiper('.reviews-letters__slider', {
  modules: [Navigation],
  slidesPerView: 2,
  spaceBetween: 8,
  slidesPerGroup: 2,
  navigation: {
    nextEl: '.reviews-letters .slider-navigation-arrow--next',
    prevEl: '.reviews-letters .slider-navigation-arrow--prev',
  },
  loop: true,
  allowTouchMove: false,
  watchOverflow: true,
});

getActiveSlides(slides);

if (reviewsLettersSlider) {
  reviewsLettersSlider.on('transitionStart ', () => {
    if (reviewsLettersSlider) {
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-visible');
      });
    }
  });

  reviewsLettersSlider.on('transitionEnd ', () => {
    if (reviewsLettersSlider) {
      getActiveSlides(slides);
    }
  });

  reviewsLettersSlider.on('slideChange ', () => {
    slidesActive.innerText = reviewsLettersSlider.realIndex + 1;
  });
}

function getActiveSlides(slides) {
  slides.forEach((slide) => {
    if (slide.classList.contains('swiper-slide-active') || slide.classList.contains('swiper-slide-next')) {
      slide.classList.add('swiper-slide-visible');
    } else {
      slide.classList.remove('swiper-slide-visible');
    }
  });
}