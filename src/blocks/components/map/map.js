
const mapPoints = [];
const map = document.querySelector('.map');
const popup = document.querySelector('.map__popup');
const marker = document.querySelector('.map__marker');
const line = document.querySelector('.map__line');
const mapPointsPath = map.querySelectorAll('path');
const mapItems = document.querySelectorAll('.map-item');

if (mapPointsPath.length) {
  mapPointsPath.forEach((point, index) => {
    point.dataset.id = index + 1;
  });

  getItems();
}

function getPopup(event) {
  const item = Object.values(mapItems).find((item) => item.dataset.id === event.dataset.id);

  const itemTitle = item.querySelector('.map-item__country');
  const itemText = item.querySelector('.map-item__text');
  const itemFlag = item.querySelector('.map-item__flag img');

  const name = popup.querySelector('.map__popup-title');
  const text = popup.querySelector('.map__popup-text');
  const img = popup.querySelector('.map__popup-flag img');

  name.innerText = itemTitle.innerText;
  text.innerText = itemText.innerText;
  img.src = itemFlag.src;

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

function getItems() {
  mapItems.forEach((item) => {
    const itemID = item.dataset.id;
    const itemCountry = item.querySelector('.map-item__country');
    const point = Object.values(mapPointsPath).find((point) => point.dataset.id == itemID);

    if (point) {
      point.dataset.country = itemCountry.innerText;
      mapPoints.push(point);
    }
  });

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

  getActivePoint(0);
  getPopup(mapPoints[0]);

}