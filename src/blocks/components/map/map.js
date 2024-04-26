
const mapPoints = [];
const map = document.querySelector('.map');
const popup = document.querySelector('.map__popup');
const marker = document.querySelector('.map__marker');
const line = document.querySelector('.map__line');
const mapPointsPath = map.querySelectorAll('path');
const mapItems = document.querySelectorAll('.map-item');
const mapMore = document.querySelector('.map-more');
const mapClose = document.querySelector('.map__popup-close');
const geographyItems = document.querySelectorAll('.geography__item');

let isHidden = true;
let isMobile = false;
let isChanged = false;

let windowWidth = 0;

windowWidth = window.innerWidth;

isMobile = windowWidth < 1400 ? true : false;
isChanged = !isMobile;

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;

  isMobile = windowWidth < 1400 ? true : false;

  if (!isMobile && !isChanged) {
    getItems();

    isChanged = true;
  }
});

if (mapPointsPath.length) {
  mapPointsPath.forEach((point, index) => {
    point.dataset.id = index + 1;
  });

  getItems();
}

if (geographyItems && geographyItems.length) {
  geographyItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const dataID = item.dataset.id;
      const findPoint = mapPoints.find((point) => point.dataset.id === dataID);

      popup.classList.remove('hidden');

      if (findPoint) {
        marker.classList.remove('show');
        line.classList.remove('show');

        getActivePoint(index);
        getPopup(findPoint);
      }
    });
  });
}

if (mapClose) {
  mapClose.addEventListener('click', () => {
    closePopup();
  });
}

function getPopup(event) {
  const item = Object.values(mapItems).find((item) => item.dataset.id === event.dataset.id);

  const itemTitle = item.querySelector('.map-item__country');
  const itemText = item.querySelector('.map-item__text');
  const itemFlag = item.querySelector('.map-item__flag img');

  const itemBottomServices = item.querySelector('.map-item__cases');
  const itemBottomCases = item.querySelector('.map-item__services');

  const itemCasesHref = item.querySelector('.map-item__link--cases');
  const itemServicesHref = item.querySelector('.map-item__link--services');

  const name = popup.querySelector('.map__popup-title');
  const text = popup.querySelector('.map__popup-text');
  const img = popup.querySelector('.map__popup-flag img');

  const services = popup.querySelector('.map__popup-services');
  const cases = popup.querySelector('.map__popup-cases');

  const btnCases = popup.querySelector('.button--cases');
  const btnServices = popup.querySelector('.button--services');

  name.innerText = itemTitle.innerText;
  text.innerText = itemText.innerText;
  img.src = itemFlag.src;

  services.querySelector('.map__popup-caption').innerText = itemBottomServices.querySelector('.map-item__bottom-title').innerText;
  services.querySelector('.map__popup-text').innerText = itemBottomServices.querySelector('.map-item__bottom-text').innerText;

  cases.querySelector('.map__popup-caption').innerText = itemBottomCases.querySelector('.map-item__bottom-title').innerText;
  cases.querySelector('.map__popup-text').innerText = itemBottomCases.querySelector('.map-item__bottom-text').innerText;

  btnServices.href = itemServicesHref.innerText;
  btnCases.href = itemCasesHref.innerText;

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
  mapItems.forEach((item, id) => {
    const itemID = item.dataset.id;
    const itemCountry = item.querySelector('.map-item__country');
    const point = Object.values(mapPointsPath).find((point) => point.dataset.id == itemID);

    if (id > 10) {
      item.classList.add('hidden');
    }

    if (point) {
      point.dataset.country = itemCountry.innerText;
      mapPoints.push(point);
    }

    item.addEventListener('click', () => {
      getPopupMobile(item);
    });
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

mapMore.addEventListener('click', () => {
  const moreText = mapMore.querySelector('span');

  isHidden = !isHidden;

  moreText.innerHTML = isHidden ? 'Все&nbsp;+&nbsp;' : 'Скрыть&nbsp;-&nbsp;';

  mapItems.forEach((item, id) => {
    if (id > 10) {
      item.classList.toggle('hidden');
    }
  });
});

function getPopupMobile(item) {
  const itemTitle = item.querySelector('.map-item__country');
  const itemText = item.querySelector('.map-item__text');
  const itemFlag = item.querySelector('.map-item__flag img');

  const itemBottomServices = item.querySelector('.map-item__cases');
  const itemBottomCases = item.querySelector('.map-item__services');

  const itemCasesHref = item.querySelector('.map-item__link--cases');
  const itemServicesHref = item.querySelector('.map-item__link--services');

  const popupMobile = document.querySelector('.popup-map');

  const popupMobileTitle = popupMobile.querySelector('.popup-map__title');
  const popupMobileText = popupMobile.querySelector('.popup-map__description');
  const popupMobileFlag = popupMobile.querySelector('.popup-map__img img');

  const popupMobileCases = popupMobile.querySelector('.popup-map__bottom-cases');
  const popupMobileServices = popupMobile.querySelector('.popup-map__bottom-services');

  const popupMobileServicesHref = popupMobile.querySelector('.button--services');
  const popupMobileCasesHref = popupMobile.querySelector('.button--cases');

  popupMobileTitle.innerText = itemTitle.innerText;
  popupMobileText.innerText = itemText.innerText;
  popupMobileFlag.src = itemFlag.src;

  popupMobileCases.querySelector('.popup-map__bottom-title').innerText = itemBottomCases.querySelector('.map-item__bottom-title').innerText;
  popupMobileCases.querySelector('.popup-map__bottom-text').innerText = itemBottomCases.querySelector('.map-item__bottom-text').innerText;

  if (itemServicesHref) {
    popupMobileServices.querySelector('.popup-map__bottom-title').innerText = itemBottomServices.querySelector('.map-item__bottom-title').innerText;
    popupMobileServices.querySelector('.popup-map__bottom-text').innerText = itemBottomServices.querySelector('.map-item__bottom-text').innerText;
    popupMobileServicesHref.href = itemServicesHref.innerText;
  }

  popupMobileCasesHref.href = itemCasesHref.innerText;
}

function closePopup() {
  popup.classList.add('hidden');
  line.classList.remove('show');
  marker.classList.remove('show');
}