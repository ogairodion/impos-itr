const dropdowns = document.querySelectorAll('.dropdown');

if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    const dropdownTop = dropdown.querySelector('.dropdown__top');

    dropdownTop.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  });
}