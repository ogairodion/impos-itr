import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';

const parent = document.querySelector('.reviews');

if (parent) {
  const tabSlides = parent.querySelectorAll('.tab');

  const reviewsTabs = new Swiper('.reviews__tabs', {
    modules: [FreeMode],
    slidesPerView: 'auto',
    freeMode: true,
    watchOverflow: true,
  });
}
