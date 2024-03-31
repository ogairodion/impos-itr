import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.reviews-messengers');
const slides = document.querySelectorAll('.reviews-messengers__slide');
const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');

slidesCurrent.innerText = slides.length;
slidesActive.innerText = 1;

const reviewsMessengersSlider = new Swiper('.reviews-messengers__slider', {
  modules: [Navigation],
  slidesPerView: 2,
  spaceBetween: 8,
  slidesPerGroup: 2,
  navigation: {
    nextEl: '.reviews-messengers .slider-navigation-arrow--next',
    prevEl: '.reviews-messengers .slider-navigation-arrow--prev',
  },
  loop: true,
  allowTouchMove: false,
  watchOverflow: true,
});

getActiveSlides(slides);

if (reviewsMessengersSlider) {
  reviewsMessengersSlider.on('transitionStart ', () => {
    if (reviewsMessengersSlider) {
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-visible');
      });
    }
  });

  reviewsMessengersSlider.on('transitionEnd ', () => {
    if (reviewsMessengersSlider) {
      getActiveSlides(slides);
    }
  });

  reviewsMessengersSlider.on('slideChange ', () => {
    slidesActive.innerText = reviewsMessengersSlider.realIndex + 1;
  });
}

function getActiveSlides(slides) {
  slides.forEach((slide, id) => {
    const currentStep = slide.querySelector('.reviews-messengers__slide-step--current');
    const steps = slide.querySelector('.reviews-messengers__slide-step--length');

    currentStep.innerText = id < 10 ? `0${id + 1}` : id + 1;
    steps.innerText = slides.length < 10 ? `0${slides.length}` : slides.length;

    if (slide.classList.contains('swiper-slide-active') || slide.classList.contains('swiper-slide-next')) {
      slide.classList.add('swiper-slide-visible');
    } else {
      slide.classList.remove('swiper-slide-visible');
    }
  });
}