import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination, Thumbs } from 'swiper/modules';

const tabsContent = document.querySelectorAll('.tabs__content');

tabsContent.forEach((content, id) => {
  const schemeSlider = content.querySelector('.scheme__slider');
  const schemeSliderInfo = content.querySelector('.scheme__slider-info');

  schemeSliderInfo.classList.add(`scheme__slider-info-${id}`);

  new Swiper(schemeSlider, {
    modules: [Navigation, EffectFade],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
    loop: true,
  });

  new Swiper(schemeSliderInfo, {
    modules: [Navigation, EffectFade, Thumbs],
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
    loop: true,
    navigation: {
      nextEl: `.scheme__slider-info-${id} .slider-navigation-arrow--next`,
      prevEl: `.scheme__slider-info-${id} .slider-navigation-arrow--prev`,
    },
    thumbs: {
      swiper: schemeSlider,
    }
  });
});
