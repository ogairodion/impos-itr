const questions = document.querySelector('.questions');

if (questions) {
  const questionsList = questions.querySelectorAll('.dropdown');
  const questionsMore = questions.querySelector('.button--more');

  if (questionsList.length) {
    questionsList.forEach((question, index) => {
      const number = question.querySelector('.dropdown__number');

      number.innerText = index + 1 < 10 ? `0${index + 1}` : index + 1;

      if (index > 4) {
        question.classList.add('hidden');
      }
    });

    if (questionsMore) {
      questionsMore.addEventListener('click', () => {
        questionsList.forEach((question) => {
          question.classList.remove('hidden');
        });

        questionsMore.classList.add('hidden');
      });
    }
  }
}