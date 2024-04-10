import { Fancybox } from "@fancyapps/ui";

const slidesMessengers = document.querySelectorAll('.reviews-messengers__slide');
const popupMessengers = document.querySelector('.reviews-messengers__popup');

const slidesLetters = document.querySelectorAll('.reviews-letters__slide');
const popupLetters = document.querySelector('.reviews-letters__popup');

if (slidesMessengers.length) {
  slidesMessengers.forEach((slide) => {
    const link = slide.querySelector('.reviews-messengers__slide-link');

    link.addEventListener('click', () => {
      getPopupMessengers(slide);
    });
  });
}

function getPopupMessengers(slide) {
  const popupTitle = popupMessengers.querySelector('.reviews-messengers__popup-title');
  const popupDescription = popupMessengers.querySelector('.reviews-messengers__popup-description');
  const popupTags = popupMessengers.querySelector('.reviews-messengers__popup-tags');
  const popupImg = popupMessengers.querySelector('img');

  popupTitle.innerText = slide.querySelector('.reviews-messengers__slide-title').innerText;
  popupDescription.innerText = slide.querySelector('.reviews-messengers__slide-description').innerText;
  popupTags.innerHTML = slide.querySelector('.reviews-messengers__slide-tags').innerHTML;
  popupImg.src = slide.querySelector('img').src;

  Fancybox.show([{ src: "#reviews-messengers-popup", type: "inline" }]);
}

if (slidesLetters.length) {
  slidesLetters.forEach((slide) => {
    const link = slide.querySelector('.reviews-letters__slide-link');

    link.addEventListener('click', () => {
      getPopupLetters(slide);
    });
  });
}

function getPopupLetters(slide) {
  const popupTitle = popupLetters.querySelector('.reviews-letters__popup-title');
  const popupDescription = popupLetters.querySelector('.reviews-letters__popup-description');
  const popupTags = popupLetters.querySelector('.reviews-letters__popup-tags');
  const popupImg = popupLetters.querySelector('img');

  popupTitle.innerText = slide.querySelector('.reviews-letters__slide-title').innerText;
  popupDescription.innerText = slide.querySelector('.reviews-letters__slide-description').innerText;
  popupTags.innerHTML = slide.querySelector('.reviews-letters__slide-tags').innerHTML;
  popupImg.src = slide.querySelector('.reviews-letters__slide-img img').src;

  Fancybox.show([{ src: "#reviews-letters-popup", type: "inline" }]);
}