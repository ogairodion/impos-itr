import "%components%/tabs/tabs";
import Swiper from 'swiper';
import { Navigation, EffectFade, Thumbs } from 'swiper/modules';

const parent = document.querySelector('.scheme');
const tabsContent = parent.querySelectorAll('.tabs__content');

let windowWidth = 0;

windowWidth = window.innerWidth;

function callback(mutationsList) {
  mutationsList.forEach((element) => {
    if (!element.target.classList.contains('hidden')) {
      getSliders(element.target);
    }
  });
}

const mutationObserver = new MutationObserver(callback);

window.addEventListener('resize', () => {
  const steps = document.querySelectorAll('.step');
  windowWidth = window.innerWidth;

  if (windowWidth >= 1440 && !steps.length) {
    tabsContent.forEach((content) => {
      getSliders(content);
    });
  }
});

tabsContent.forEach((content) => {
  mutationObserver.observe(content, { attributes: true });
});

function getSliders(element) {
  let slider = element.querySelector('.scheme__slider');
  let sliderInfo = element.querySelector('.scheme__slider-info');
  let arrowLeft = element.querySelector('.slider-navigation-arrow--prev');
  let arrowRight = element.querySelector('.slider-navigation-arrow--next');
  let sliders = sliderInfo ? sliderInfo.querySelectorAll('.swiper-slide') : [];

  const steps = element.querySelectorAll('.step');

  const sliderLength = element.querySelector('.slider-navigation-progress__length');
  const sliderActiveIndex = element.querySelector('.slider-navigation-progress__active');

  sliderLength.innerText = sliders.length;
  sliderActiveIndex.innerText = 1;

  slider = new Swiper(slider, {
    modules: [Navigation, EffectFade],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });

  sliderInfo = new Swiper(sliderInfo, {
    modules: [Navigation, EffectFade, Thumbs],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: arrowRight,
      prevEl: arrowLeft,
    },
    on: {
      slideChange() {
        sliderActiveIndex.innerText = this.activeIndex + 1;

        getPosition(this, this.activeIndex);
      },

      init() {
        getPosition(this, this.activeIndex);
      }
    },
    thumbs: {
      swiper: slider,
    },
  });

  if (!steps || !steps.length) {
    if (windowWidth >= 1440) {
      getSteps(element, slider);
    }
  }
}

function getSteps(content, slider) {
  const steps = content.querySelector('.steps__wrapper');
  const progress = steps.querySelector('.steps__progress');
  const progressbar = steps.querySelector('.steps__progressbar');
  const points = progress.querySelector('.steps__points');
  const pointsBar = progressbar.querySelector('.steps__points');
  const slides = slider.el.swiper.slides;

  slides.forEach((_slide, index) => {
    const createdStep = document.createElement('div');

    createdStep.classList.add('step');
    createdStep.classList.add('f-caps-small');
    createdStep.innerText = `Шаг ${index + 1 < 10 ? `0${index + 1}` : index + 1}`;

    steps.append(createdStep);

    createdStep.addEventListener('click', () => {
      slider.slideTo(index);

      getPosition(slider, index);
    });

    createdStep.addEventListener('click', () => {
      slider.slideTo(index);

      getPosition(slider, index);
    });
  });

  getPoints(content, points, pointsBar, slider);
}

function getPoints(content, points, pointsBar, slider) {
  const steps = content.querySelectorAll('.step');
  let positionX = 24;

  steps.forEach((step, index) => {
    // const { width } = step.getBoundingClientRect();

    const createdPoint = document.createElement('div');
    const createdPointBar = document.createElement('div');

    positionX += index == 0 ? 98 : 98 + 12;

    createdPoint.classList.add('steps__point');
    createdPointBar.classList.add('steps__point');

    createdPoint.style.left = (positionX - (98 / 2)) + 'px';
    createdPointBar.style.left = (positionX - (98 / 2)) + 'px';

    createdPoint.addEventListener('click', () => {
      slider.slideTo(index);

      getPosition(slider, index);
    });

    createdPointBar.addEventListener('click', () => {
      slider.slideTo(index);

      getPosition(slider, index);
    });

    points.append(createdPoint);
    pointsBar.append(createdPointBar);
  });
}

function getPosition(slider, slideActive) {
  const step = 98;
  const tab = slider.el.closest('.tabs__content');
  const progressbar = tab.querySelector('.steps__progressbar');

  progressbar.style.width = ((step + 12) * (slideActive + 1) - 16) + 'px';
}