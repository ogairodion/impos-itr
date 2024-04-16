import "%components%/tabs/tabs";
import Swiper from 'swiper';
import { Navigation, EffectFade, Thumbs } from 'swiper/modules';

const parent = document.querySelector('.scheme');
const tabsContent = parent.querySelectorAll('.tabs__content');

let windowWidth = 0;
let progressBarWidth = 276.32;

windowWidth = window.innerWidth;

getSliders(tabsContent[0]);

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

  const progressbar = element.querySelector('.progress-bar');
  const activeTitle = element.querySelector('.scheme__slider-title');

  const currentStep = element.querySelector('.scheme__slider-step--current');
  const currentStepAll = element.querySelector('.scheme__slider-step--all');

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
        currentStep.innerText = `Шаг ${this.activeIndex + 1 < 10 ? `0${this.activeIndex + 1}` : `${this.activeIndex + 1}`}`;
        progressbar.style.strokeDashoffset = progressBarWidth* ((100 - ((this.realIndex + 1) / this.slides.length) * 100) / 100);
        getPosition(this, this.activeIndex, activeTitle);
      },

      init() {
        currentStep.innerText = `Шаг ${this.activeIndex + 1 < 10 ? `0${this.activeIndex + 1}` : `${this.activeIndex + 1}`}`;
        currentStepAll.innerHTML = `<span>из ${sliders.length}</span>`;
        progressbar.style.strokeDashoffset = progressBarWidth* ((100 - ((this.realIndex + 1) / this.slides.length) * 100) / 100);
        getPosition(this, this.activeIndex, activeTitle);
      }
    },
    thumbs: {
      swiper: slider,
    },
  });

  if (!steps || !steps.length) {
    if (windowWidth >= 1440) {
      getSteps(element, slider, activeTitle);
    }
  }
}

function getSteps(content, slider, activeTitle) {
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

      getPosition(slider, index, activeTitle);
    });

    createdStep.addEventListener('click', () => {
      slider.slideTo(index);

      getPosition(slider, index, activeTitle);
    });
  });

  getPoints(content, points, pointsBar, slider);
}

function getPoints(content, points, pointsBar, slider) {
  const steps = content.querySelectorAll('.step');
  const progress = content.querySelector('.steps__progress');

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

  progress.style.width = ((98 + 12) * steps.length - 30) + 'px';
}

function getPosition(slider, slideActive, activeTitle) {
  const step = 98;
  const tab = slider.el.closest('.tabs__content');
  const steps = tab.querySelectorAll('.step');
  const progressbar = tab.querySelector('.steps__progressbar');
  const slideTitle = slider.slides[slideActive].querySelector('.scheme__slide-title');

  progressbar.style.width = ((step + 12) * (slideActive + 1) - 16) + 'px';
  activeTitle.innerText = slideTitle.innerText;

  steps.forEach((step, index) => {
    if (index === slideActive) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}