const ratesTop = document.querySelectorAll('.rates__table-top');

if (ratesTop.length) {
  ratesTop.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const td = e.target.closest('td');

      td.classList.toggle('open');
    });
  });
}