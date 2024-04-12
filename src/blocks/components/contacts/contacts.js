import { Fancybox } from "@fancyapps/ui";

const contacts = document.querySelector('.contacts');
const contactsIcon = contacts.querySelector('.default');
const contactsClose = contacts.querySelector('.close');
const contactsMobile = contacts.querySelector('.contacts__mobile');

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-main');
const menuIcon = menuBtn.querySelector('.default');
const menuClose = menuBtn.querySelector('.close');

let windowWidth = 0;

windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;

  if (windowWidth > 1200) {
    contactsIcon.classList.remove('hidden');
    contactsClose.classList.add('hidden');
  }
});

contacts.addEventListener('click', () => {
  if (windowWidth < 1200) {
    menu.classList.remove('open');

    menuIcon.classList.remove('hidden');
    menuClose.classList.add('hidden');

    contactsMobile.classList.toggle('show');
    contactsIcon.classList.toggle('hidden');
    contactsClose.classList.toggle('hidden');
  } else {
    Fancybox.show([{ src: "#popup-call", type: "inline" }]);
  }
});

if (windowWidth > 1200) {
  contactsIcon.classList.remove('hidden');
  contactsClose.classList.add('hidden');
}