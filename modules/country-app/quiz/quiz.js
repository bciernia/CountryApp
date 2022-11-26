const getCountryToQuiz = (countryArray) => countryArray[Math.floor(Math.random() * countryArray.length + 1)];

const prepareCountryToShow = (countryToGuess) => {
  const guessImg = document.querySelector('.modal-img');
  guessImg.src = countryToGuess.flag;
  guessImg.alt = countryToGuess.name;
};

export const generateGuessCountryNameQuiz = (countryArray) => {
  const countryToGuess = getCountryToQuiz(countryArray);
  prepareCountryToShow(countryToGuess);

  return countryToGuess;
};

export const checkIfAnswerWasRight = (userAnswer, countryToGuess, modal) => {
  const wasAnswerRightInfo = document.querySelector('.is-answer-right');

  if (userAnswer.toLowerCase() === countryToGuess.name.toLowerCase()) {
    modal.classList.add('right-answer');
    wasAnswerRightInfo.innerText = 'You are right!';
  } else {
    modal.classList.add('wrong-answer');
    wasAnswerRightInfo.innerText = `Nope, right answer is ${countryToGuess.name}`;
  }
};
