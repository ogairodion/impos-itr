import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.reviews-videos');
const reviews = document.querySelector('.reviews');

if (parent && !reviews.classList.contains('block-main')) {
  const slides = document.querySelectorAll('.reviews-videos__slide');
  const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
  const slidesActive = parent.querySelector('.slider-navigation-progress__active');
  const sliderNavigation = parent.querySelector('.slider-navigation');
  const popup = document.querySelector('.reviews-videos__popup');

  slidesCurrent.innerText = slides.length;
  slidesActive.innerText = 1;

  let windowWidth = 0;
  windowWidth = window.innerWidth;

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

  const reviewsVideosSlider = new Swiper('.reviews-videos__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 8,
    navigation: {
      nextEl: '.reviews-videos .slider-navigation-arrow--next',
      prevEl: '.reviews-videos .slider-navigation-arrow--prev',
    },
    loop: true,
    watchOverflow: true,
    centeredSlides: true,
    observeParents: true,
    observer: true,
    watchSlidesProgress: true,
    breakpoints: {
      1200: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        allowTouchMove: false,
        centeredSlides: false,
      },
    },
  });

  getActiveSlides(slides);

  if (reviewsVideosSlider) {
    reviewsVideosSlider.on('transitionStart ', () => {
      if (reviewsVideosSlider) {
        slides.forEach((slide) => {
          slide.classList.remove('swiper-slide-visible');
        });
      }
    });

    reviewsVideosSlider.on('transitionEnd ', () => {
      if (reviewsVideosSlider) {
        getActiveSlides(slides);
      }
    });

    reviewsVideosSlider.on('slideChange ', () => {
      slidesActive.innerText = reviewsVideosSlider.realIndex + 1;
    });
  }

  function getActiveSlides(slides) {
    slides.forEach((slide, id) => {
      if (slide.classList.contains('swiper-slide-active') || slide.classList.contains('swiper-slide-next')) {
        slide.classList.add('swiper-slide-visible');
      } else {
        slide.classList.remove('swiper-slide-visible');
      }
    });
  }
}
