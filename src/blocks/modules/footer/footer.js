const items = document.querySelectorAll('.footer__item');

if (items.length) {
  items.forEach((item) => {
    const itemTop = item.querySelector('.footer__item-top');

    if (itemTop) {
      itemTop.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });
}