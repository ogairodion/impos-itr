import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const parent = document.querySelector('.team');
const slides = document.querySelectorAll('.team__slide');
const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');

slidesCurrent.innerText = slides.length;
slidesActive.innerText = 1;

const teamSlider = new Swiper('.team__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 3,
  spaceBetween: 8,
  slidesPerGroup: 3,
  navigation: {
    nextEl: '.team .slider-navigation-arrow--next',
    prevEl: '.team .slider-navigation-arrow--prev',
  },
  allowTouchMove: false,
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
  },
  loop: true,
  watchOverflow: true,
});

getActiveSlides();

if (teamSlider) {
  teamSlider.on('transitionStart ', () => {
    if (teamSlider) {
      slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-visible');
      });
    }
  });

  teamSlider.on('transitionEnd ', () => {
    getActiveSlides();
  });

  teamSlider.on('slideChange ', () => {
    slidesActive.innerText = teamSlider.realIndex + 1;
  });
}

function getActiveSlides() {
  if (teamSlider) {
    slides.forEach((slide, id) => {
      if (!slide.classList.contains('team__slide-more')) {
        if (teamSlider.realIndex - id >= -2 ) {
          slide.classList.add('swiper-slide-visible');
        } else {
          slide.classList.remove('swiper-slide-visible');
        }
      } else {
        if (slide.classList.contains('swiper-slide-active')) {
          slide.classList.add('swiper-slide-visible');
        } else {
          slide.classList.remove('swiper-slide-visible');
        }
      }
    });
  }
}

if (slides.length) {
  slides.forEach((slide, id) => {
    const buttonMore = slide.querySelector('.btn--more');
    const buttonClose = slide.querySelector('.btn--close');
    const currentStep = slide.querySelector('.team__slide-step--current');
    const steps = slide.querySelector('.team__slide-step--length');

    currentStep.innerText = id < 10 ? `0${id + 1}` : id + 1;
    steps.innerText = slides.length < 10 ? `0${slides.length}` : slides.length;

    buttonMore.addEventListener('click', () => {
      changeSliders(true, id);
    });

    buttonClose.addEventListener('click', () => {
      changeSliders(false, id);
    });
  });
}

function changeSliders(switcher, id) {
  if (switcher) {
    teamSlider.params.slidesPerView = 1;
    teamSlider.params.slidesPerGroup = 1;

    slides.forEach((slide) => {
      slide.classList.add('team__slide-more');

      if (!slide.classList.contains('swiper-slide-active')) {
        slide.classList.remove('swiper-slide-visible');
      }
    });

    teamSlider.update();
    teamSlider.slideTo(id);
  } else {
    teamSlider.params.slidesPerView = 'auto';
    teamSlider.params.slidesPerGroup = 3;

    slides.forEach((slide, id) => {
      slide.classList.remove('team__slide-more');

      if (teamSlider.realIndex - id >= -2 ) {
        slide.classList.add('swiper-slide-visible');
      } else {
        slide.classList.remove('swiper-slide-visible');
      }
    });
    teamSlider.slideTo(0);
    teamSlider.update();
  }
}