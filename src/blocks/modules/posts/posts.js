import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const postsSlider = new Swiper('.posts__slider', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 8,
  breakpoints: {
    1300: {
      spaceBetween: 16,
      allowTouchMove: false,
      loop: false,
    },
  },
  pagination: {
    el: '.posts .slider-pagination',
    clickable: true,
  },
});
