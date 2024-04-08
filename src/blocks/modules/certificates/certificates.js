import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const parent = document.querySelector('.certificates');
const slides = document.querySelectorAll('.certificates__slide');
const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');

slidesCurrent.innerText = slides.length;
slidesActive.innerText = 1;

const certificatesSlider = new Swiper('.certificates__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 'auto',
  spaceBetween: 8,
  navigation: {
    nextEl: '.certificates .slider-navigation-arrow--next',
    prevEl: '.certificates .slider-navigation-arrow--prev',
  },
  pagination: {
    el: '.certificates .slider-pagination',
    clickable: true,
  },
  loop: true,
  centeredSlides: true,
  breakpoints: {
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      allowTouchMove: false,
      watchOverflow: true,
      centeredSlides: false,
    },
  },
});

getActiveSlides(slides);

if (certificatesSlider) {
  certificatesSlider.on('transitionStart ', () => {
    if (certificatesSlider) {
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-visible');
      });
    }
  });

  certificatesSlider.on('transitionEnd ', () => {
    if (certificatesSlider) {
      getActiveSlides(slides);
    }
  });

  certificatesSlider.on('slideChange ', () => {
    slidesActive.innerText = certificatesSlider.realIndex + 1;
  });
}

function getActiveSlides(slides) {
  slides.forEach((slide, id) => {
    if (certificatesSlider.realIndex - id >= -4 ) {
      slide.classList.add('swiper-slide-visible');
    } else {
      slide.classList.remove('swiper-slide-visible');
    }
  });
}