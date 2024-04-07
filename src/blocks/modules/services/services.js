const services = document.querySelectorAll('.services__item');

if (services.length) {
  services.forEach((service) => {
    const serviceTop = service.querySelector('.services__item-top');
    const serviceContent = service.querySelector('.services__item-content');

    serviceTop.addEventListener('click', () => {
      serviceContent.classList.toggle('open');
      serviceTop.classList.toggle('open');
    });
  });
}