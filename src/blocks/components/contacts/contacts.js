const contacts = document.querySelector('.contacts');
const contactsIcon = contacts.querySelector('.default');
const contactsClose = contacts.querySelector('.close');

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
    contactsIcon.classList.toggle('hidden');
    contactsClose.classList.toggle('hidden');
  }
});

if (windowWidth > 1200) {
  contactsIcon.classList.remove('hidden');
  contactsClose.classList.add('hidden');
}