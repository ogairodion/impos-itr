const menuBtn = document.querySelector('.menu-main');
const menuBtnClose = document.querySelector('.menu__close');
const menu = document.querySelector('.menu');

const menuIcon = menuBtn.querySelector('.default');
const menuClose = menuBtn.querySelector('.close');

const level_1 = document.querySelector('.menu__column-lvl-1');
const level_2 = document.querySelector('.menu__column-lvl-2');
const level_3 = document.querySelector('.menu__column-lvl-3');

const menu_items = level_1.querySelectorAll('.menu__item');
const submenu_items = level_2.querySelectorAll('.menu__links');
const submenu_links = level_3.querySelectorAll('.menu__links');

const menuColumnClose = menu.querySelectorAll('.menu__column-close');
const btnCall = menu.querySelector('.button--call');

const menuForm = menu.querySelector('.menu__form');

const contacts = document.querySelector('.contacts');
const contactsMobile = contacts.querySelector('.contacts__mobile');
const contactsIcon = contacts.querySelector('.default');
const contactsClose = contacts.querySelector('.close');

let windowWidth = 0;
windowWidth = window.innerWidth;

if (windowWidth < 1200 && !menuForm.classList.contains('hidden')) {
  menuForm.classList.add('hidden');
}

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;

  if (windowWidth < 1200 && !menuForm.classList.contains('hidden')) {
    menuForm.classList.add('hidden');
  }

  if (windowWidth >= 1200) {
    menuForm.classList.remove('hidden');
  }
});

menuBtn.addEventListener('click', () => {
  contactsMobile.classList.remove('show');
  contactsIcon.classList.remove('hidden');
  contactsClose.classList.add('hidden');

  if (windowWidth < 1200) {
    if (!menuForm.classList.contains('hidden')) {
      menuForm.classList.add('hidden');
    } else {
      menu.classList.toggle('open');
      menuIcon.classList.toggle('hidden');
      menuClose.classList.toggle('hidden');
    }
  } else {
    menu.classList.toggle('open');
    menuIcon.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
  }
});

menuBtnClose.addEventListener('click', () => {
  menu.classList.remove('open');
  menuIcon.classList.remove('hidden');
  menuClose.classList.add('hidden');
});

if (menu_items.length) {
  menu_items.forEach((menuItem) => {
    menuItem.addEventListener('mouseover', (e) => {
      if (windowWidth >= 1200) {
        const id = e.currentTarget.dataset.menuId;

        submenu_items.forEach((submenuItem) => {
          const submenuItemLinks = submenuItem.querySelectorAll('.menu__link');
          const submenuItemID = submenuItem.dataset.menuId;

          submenuItemLinks.forEach((submenuLink, index) => {
            if (submenuItemID == id) {
              submenuItem.classList.remove('hidden');
            } else {
              submenuItem.classList.add('hidden');

              submenu_links.forEach((link) => {
                link.classList.add('hidden');
              });
            }

            submenuLink.addEventListener('mouseover', () => {
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
      }
    });

    menuItem.addEventListener('click', (e) => {
      if (windowWidth < 1200) {
        const id = e.currentTarget.dataset.menuId;

        submenu_items.forEach((submenuItem) => {
          const submenuItemLinks = submenuItem.querySelectorAll('.menu__link');
          const submenuItemID = submenuItem.dataset.menuId;

          submenuItemLinks.forEach((submenuLink, index) => {
            level_2.style.display = 'block';

            if (submenuItemID == id) {
              submenuItem.classList.remove('hidden');
            } else {
              submenuItem.classList.add('hidden');

              submenu_links.forEach((link) => {
                link.classList.add('hidden');
              });
            }

            submenuLink.addEventListener('click', () => {
              submenu_links.forEach((link) => {
                const linkID = link.dataset.menuId;
                level_3.style.display = 'block';

                if (linkID == `${submenuItemID}-${index + 1}`) {
                  link.classList.remove('hidden');
                } else {
                  link.classList.add('hidden');
                }
              });
            });
          });
        });
      }
    });
  });
}

menuColumnClose.forEach((btn) => {
  const level = btn.closest('.menu__column');
  const links = level.querySelector('.menu__links');

  btn.addEventListener('click', () => {
    level.style.display = 'none';
    links.classList.add('hidden');
  });
});

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

btnCall.addEventListener('click', () => {
  menuForm.classList.toggle('hidden');
});