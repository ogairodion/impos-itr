import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.reviews-messengers');

if (parent) {
  const slides = document.querySelectorAll('.reviews-messengers__slide');
  const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
  const slidesActive = parent.querySelector('.slider-navigation-progress__active');
  const sliderNavigation = parent.querySelector('.slider-navigation');
  const popup = document.querySelector('.reviews-messengers__popup');

  slidesCurrent.innerText = slides.length;
  slidesActive.innerText = 1;

  if (slides.length) {
    slides.forEach((slide) => {
      const link = slide.querySelector('.reviews-messengers__slide-link');

      link.addEventListener('click', () => {
        getPopup(slide);
      });
    });
  }

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

  const reviewsMessengersSlider = new Swiper('.reviews-messengers__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 8,
    navigation: {
      nextEl: '.reviews-messengers .slider-navigation-arrow--next',
      prevEl: '.reviews-messengers .slider-navigation-arrow--prev',
    },
    loop: true,
    watchOverflow: true,
    centeredSlides: true,
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

  function getPopup(slide) {
    const popupTitle = popup.querySelector('.reviews-messengers__popup-title');
    const popupDescription = popup.querySelector('.reviews-messengers__popup-description');
    const popupTags = popup.querySelector('.reviews-messengers__popup-tags');
    const popupImg = popup.querySelector('img');

    popupTitle.innerText = slide.querySelector('.reviews-messengers__slide-title').innerText;
    popupDescription.innerText = slide.querySelector('.reviews-messengers__slide-description').innerText;
    popupTags.innerHTML = slide.querySelector('.reviews-messengers__slide-tags').innerHTML;
    popupImg.src = slide.querySelector('img').src;

    Fancybox.show([{ src: "#reviews-messengers-popup", type: "inline" }]);
  }
}
