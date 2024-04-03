const menuBtn = document.querySelector('.menu-main');
const menuBtnClose = document.querySelector('.menu__close');
const menu = document.querySelector('.menu');

const level_1 = document.querySelector('.menu__column-lvl-1');
const level_2 = document.querySelector('.menu__column-lvl-2');
const level_3 = document.querySelector('.menu__column-lvl-3');

const menu_items = level_1.querySelectorAll('.menu__item');
const submenu_items = level_2.querySelectorAll('.menu__link');
const submenu_links = level_3.querySelectorAll('.menu__links');

menuBtn.addEventListener('click', () => {
  menu.classList.add('open');
});

menuBtnClose.addEventListener('click', () => {
  menu.classList.remove('open');
});

if (menu_items.length) {
  menu_items.forEach((menuItem) => {
    menuItem.addEventListener('mouseover', (e) => {
      const id = e.currentTarget.dataset.menuId;

      submenu_items.forEach((submenuItem, index) => {
        const submenuItemID = submenuItem.dataset.menuId;

        if (submenuItemID == id) {
          submenuItem.classList.remove('hidden');
        } else {
          submenuItem.classList.add('hidden');

          submenu_links.forEach((link) => {
            link.classList.add('hidden');
          });
        }

        submenuItem.addEventListener('mouseover', () => {
          submenu_links.forEach((link) => {
            const linkID = link.dataset.menuId;

            if (linkID == `${submenuItemID}-${index + 1}`) {
              link.classList.remove('hidden');
            } else {
              link.classList.add('hidden');
            }
          });
        });
      });
    });
  });
}

if (submenu_items.length) {
  submenu_items.forEach((submenu_item) => {
    submenu_item.classList.add('hidden');
  });
}

if (submenu_links.length) {
  submenu_links.forEach((submenu_link) => {
    submenu_link.classList.add('hidden');
  });
}