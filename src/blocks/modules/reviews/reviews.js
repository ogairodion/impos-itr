import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';

const reviewsTabs = new Swiper('.reviews__tabs', {
  modules: [FreeMode],
  slidesPerView: 'auto',
  freeMode: true,
  watchOverflow: true,
});