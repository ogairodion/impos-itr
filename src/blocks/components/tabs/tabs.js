const tabs = document.querySelector('.tabs');
const section = tabs.closest('section');
const tabsItems = section.querySelectorAll('.tab');
const tabsContent = section.querySelectorAll('.tabs__content');

getActiveTab(0);

tabsItems.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    getActiveTab(index);
  });
});

function getActiveTab(index) {
  tabsContent.forEach((content, id) => {
    if (index == id) {
      content.classList.remove('hidden');
    } else {
      content.classList.add('hidden');
    }
  });

  tabsItems.forEach((tab, id) => {
    if (index == id) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
};