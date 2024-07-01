import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

const cases = document.querySelector('.cases');

if (cases) {
  const items = cases.querySelectorAll('.cases__item');
  let headerHeight = document.querySelector('.header').offsetHeight;
  let diff = headerHeight;

  let windowWidth = 0;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
  });

  if (items.length) {
    items.forEach((item, id) => {
      let slider = item.querySelector('.swiper');
      const slides = item.querySelectorAll('.swiper-slide');
      const arrowNext = item.querySelector('.slider-navigation-arrow--next');
      const arrowPrev = item.querySelector('.slider-navigation-arrow--prev');
      const slidesLength = item.querySelector('.slider-navigation-progress__length');
      const slidesActive = item.querySelector('.slider-navigation-progress__active');
      const slideTop = item.querySelector('.cases__item-top');

      slidesLength.innerText = slides.length;

      arrowNext.classList.add(`swiper-arrow-next-${id}`);
      arrowPrev.classList.add(`swiper-arrow-prev-${id}`);
      slider.classList.add(`swiper-slider-${id}`);

      new Swiper(`.swiper-slider-${id}`, {
        modules: [Navigation, EffectFade],
        slidesPerView: 1,
        spaceBetween: 8,
        navigation: {
          nextEl: `.swiper-arrow-next-${id}`,
          prevEl: `.swiper-arrow-prev-${id}`,
        },
        loop: true,
        on: {
          slideChange: function () {
            slidesActive.innerText = this.realIndex + 1;
          },
        },
      });

      item.style.top += `${diff}px`;
      diff += 64;

      slideTop.addEventListener('click', () => {
        if (windowWidth < 1200) {
          item.classList.toggle('open');
        }
      });
    });
  }


  const itemsArray = gsap.utils.toArray('.cases__item');

  itemsArray.forEach((item) => {
    if (windowWidth < 1200 && !cases.classList.contains('block-main')) {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top top',
          end: '+=500',
          onLeaveBack: () => {
            const shadow = item.querySelector('.shadow');
            shadow.classList.remove('show');
          },
        }
      });

      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top top',
          end: '+=500',
          toggleActions: 'none none none none',
          onEnter: () => {
            const shadow = item.querySelector('.shadow');
            shadow.classList.add('show');
          },
        }
      });
    }
  });
}
