const geographyItems = document.querySelectorAll('.geography__item');
const geographyMore = document.querySelector('.geography__more');

if (geographyItems?.length) {
  let isHidden = true;

  geographyMore.addEventListener('click', () => {
    showHide();
  });

  if (geographyItems.length) {
    geographyItems.forEach((item, index) => {
      if (index > 10) {
        item.classList.add('hidden');
      }
    });
  }

  function showHide() {
    if (geographyItems.length) {
      const moreText = geographyMore.querySelector('span');

      isHidden = !isHidden;

      moreText.innerHTML = isHidden ? 'Все&nbsp;+&nbsp;' : 'Скрыть&nbsp;-&nbsp;';

      geographyItems.forEach((item, index) => {
        if (isHidden && index > 10) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
    }
  }
}