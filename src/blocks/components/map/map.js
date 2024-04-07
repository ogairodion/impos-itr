
const mapPoints = document.querySelectorAll('[data-city]');
const map = document.querySelector('.map');
const popup = document.querySelector('.map__popup');
const marker = document.querySelector('.map__marker');
const line = document.querySelector('.map__line');

if (mapPoints.length) {
  mapPoints.forEach((point, index) => {
    point.addEventListener('click', (event) => {
      marker.classList.remove('show');
      line.classList.remove('show');

      getActivePoint(index);
      getPopup(event.target);
    });
  });
}

function getPopup(event) {
  const parentWidth = map.offsetWidth;
  const parentHeight = map.offsetHeight;

  const y = event.getBBox().y;
  const x = event.getBBox().x;

  popup.classList.remove('hidden');

  const popupWidth = popup.getBoundingClientRect().width;
  const popupHeight = popup.getBoundingClientRect().height;

  if (y > parentHeight / 2) {
    popup.style.top = y - popupHeight + 32 + 'px';
  } else {
    popup.style.top = y - 32 + 'px';
  }

  if (x > parentWidth / 2) {
    popup.style.left = x - popupWidth - 32 + 'px';
    line.style.transform = 'rotateX(180deg)';
    line.style.left = x - 32 + 'px';
  } else {
    popup.style.left = x + 32 + 'px';
    line.style.left = x + 'px';
    line.style.transform = 'rotateX(0)';
  }

  marker.style.left = x - 6 + 'px';
  marker.style.top = y - 6 + 'px';

  line.style.top = y + 4 + 'px';

  line.classList.add('show');
  marker.classList.add('show');
}

function getActivePoint(index) {
  mapPoints.forEach((point, id) => {
    if (index == id) {
      point.classList.add('active');
    } else {
      point.classList.remove('active');
    }
  });
}
