let countryToGuess;

const getRandomCountry = (countryArray) => countryArray[Math.floor(Math.random() * countryArray.length + 1)];

const prepareCountryToShow = (countryToGuess) => {
  const guessImg = document.querySelector('.modal-img');
  guessImg.src = countryToGuess.flag;
  guessImg.alt = countryToGuess.name;
};

export const generateGuessCountryNameQuiz = (countryArray) => {
  countryToGuess = getRandomCountry(countryArray);
  prepareCountryToShow(countryToGuess);

  return countryToGuess;
};

export const checkIfAnswerWasRight = (userAnswer, modal) => {
  const wasAnswerRightParagraph = document.querySelector('.is-answer-right');

  if (userAnswer.toLowerCase() === countryToGuess.name.toLowerCase()) {
    modal.classList.add('right-answer');
    wasAnswerRightParagraph.innerText = 'You are right!';
  } else {
    modal.classList.add('wrong-answer');
    wasAnswerRightParagraph.innerText = `Nope, right answer is ${countryToGuess.name}`;
  }
};
