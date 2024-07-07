import fancybox from '@fancyapps/fancybox';
import Inputmask from "inputmask";

const phones = document.querySelectorAll('input[type="phone"]');
const im = new Inputmask('+7(999)-999-99-99');

im.mask(phones);

let scrollBefore = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  scrollBefore = window.scrollY;
});