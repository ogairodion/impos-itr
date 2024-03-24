import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination, Thumbs } from 'swiper/modules';

const tabsContent = document.querySelectorAll('.tabs__content');

function callback(mutationsList) {
  mutationsList.forEach((element) => {
    if (!element.target.classList.contains('hidden')) {
      getSliders(element.target);
    }
  });
}

const mutationObserver = new MutationObserver(callback);

tabsContent.forEach((content) => {
  mutationObserver.observe(content, { attributes: true });
});

function getSliders(element) {
  let slider = element.querySelector('.scheme__slider');
  let sliderInfo = element.querySelector('.scheme__slider-info');
  let arrowLeft = element.querySelector('.slider-navigation-arrow--prev');
  let arrowRight = element.querySelector('.slider-navigation-arrow--next');

  const sliders = sliderInfo.querySelectorAll('.swiper-slide');
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
      },
    },
    thumbs: {
      swiper: slider,
    },
  });
}