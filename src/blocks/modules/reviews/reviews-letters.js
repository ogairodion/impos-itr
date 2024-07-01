import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";

const parent = document.querySelector('.reviews-letters');

if (parent) {
  const slides = document.querySelectorAll('.reviews-letters__slide');
  const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
  const slidesActive = parent.querySelector('.slider-navigation-progress__active');
  const sliderNavigation = parent.querySelector('.slider-navigation');
  const popup = document.querySelector('.reviews-letters__popup');

  let windowWidth = 0;
  windowWidth = window.innerWidth;

  if (slides.length) {
    slides.forEach((slide) => {
      const link = slide.querySelector('.reviews-letters__slide-link');

      link.addEventListener('click', () => {
        getPopup(slide);
      });
    });
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

  const reviewsLettersSlider = new Swiper('.reviews-letters__slider', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 8,
    navigation: {
      nextEl: '.reviews-letters .slider-navigation-arrow--next',
      prevEl: '.reviews-letters .slider-navigation-arrow--prev',
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

  function getPopup(slide) {
    const popupTitle = popup.querySelector('.reviews-letters__popup-title');
    const popupDescription = popup.querySelector('.reviews-letters__popup-description');
    const popupTags = popup.querySelector('.reviews-letters__popup-tags');
    const popupImg = popup.querySelector('img');

    popupTitle.innerText = slide.querySelector('.reviews-letters__slide-title').innerText;
    popupDescription.innerText = slide.querySelector('.reviews-letters__slide-description').innerText;
    popupTags.innerHTML = slide.querySelector('.reviews-letters__slide-tags').innerHTML;
    popupImg.src = slide.querySelector('.reviews-letters__slide-img img').src;

    Fancybox.show([{ src: "#reviews-letters-popup", type: "inline" }]);
  }
}
