import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const parent = document.querySelector('.team');
const slides = document.querySelectorAll('.team__slide');
const slidesCurrent = parent.querySelector('.slider-navigation-progress__length');
const slidesActive = parent.querySelector('.slider-navigation-progress__active');
const sliderNavigation = parent.querySelector('.slider-navigation');

let windowWidth = 0;
windowWidth = window.innerWidth;

if (windowWidth < 1200) {
  sliderNavigation.classList.add('slider-navigation--default');
  sliderNavigation.classList.remove('slider-navigation--vertical');
} else {
  sliderNavigation.classList.add('slider-navigation--vertical');
  sliderNavigation.classList.remove('slider-navigation--default');
}

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;

  if (windowWidth < 1200) {
    sliderNavigation.classList.add('slider-navigation--default');
    sliderNavigation.classList.remove('slider-navigation--vertical');

    if (slides[0].classList.contains('team__slide-more')) {
      slides.forEach((slide) => {
        slide.classList.remove('team__slide-more');
      });
    }
  } else {
    sliderNavigation.classList.add('slider-navigation--vertical');
    sliderNavigation.classList.remove('slider-navigation--default');
  }
});

slidesCurrent.innerText = slides.length;
slidesActive.innerText = 1;

const teamSlider = new Swiper('.team__slider', {
  modules: [Navigation],
  slidesPerView: 'auto',
  spaceBetween: 8,
  navigation: {
    nextEl: '.team .slider-navigation-arrow--next',
    prevEl: '.team .slider-navigation-arrow--prev',
  },
  centeredSlides: true,
  breakpoints: {
    1200: {
      slidesPerView: 3,
      allowTouchMove: false,
      slidesPerGroup: 3,
      centeredSlides: false,
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
  if (windowWidth >= 992) {
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
  } else {
    getPopup(id);
  }
}

function getPopup(id) {
  const popup = document.querySelector('.team__popup');
  const popupIMG = popup.querySelector('img');
  const popupName = popup.querySelector('.team__popup-name');
  const popupPosition = popup.querySelector('.team__popup-position');
  const popupEducation = popup.querySelector('.team__popup-education .team__popup-title');
  const popupEducationDescription = popup.querySelector('.team__popup-education .team__popup-text');
  const popupJob = popup.querySelector('.team__popup-job .team__popup-title');
  const popupJobDescription = popup.querySelector('.team__popup-job .team__popup-text');

  popupIMG.setAttribute('src', slides[id].querySelector('img').attributes.src.value);
  popupName.innerText = slides[id].querySelector('.team__slide-name').innerText;
  popupPosition.innerText = slides[id].querySelector('.team__slide-position').innerText;
  popupEducation.innerText = slides[id].querySelector('.team__slide-education .team__slide-title').innerText;
  popupEducationDescription.innerHTML = slides[id].querySelector('.team__slide-education .team__slide-text').innerHTML;
  popupJob.innerText = slides[id].querySelector('.team__slide-job .team__slide-title').innerText;
  popupJobDescription.innerHTML = slides[id].querySelector('.team__slide-job .team__slide-text').innerHTML;

  Fancybox.show([{ src: "#team-popup", type: "inline" }]);
}