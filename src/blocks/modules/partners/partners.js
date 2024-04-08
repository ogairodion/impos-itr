import { Swiper } from 'swiper';
import { Pagination, Grid } from 'swiper/modules';

const partnersSlider = new Swiper('.partners__items', {
  modules: [Pagination, Grid],
  slidesPerView: 'auto',
  spaceBetween: 8,
  grid: {
    rows: 3,
  },
  observeParents: true,
  observer: true,
  breakpoints: {
    1200: {
      slidesPerView: 6,
      allowTouchMove: false,
      centeredSlides: false,
      grid: {
        rows: 3,
      },
    },
  },
  pagination: {
    el: '.partners .slider-pagination',
    clickable: true,
  },
});