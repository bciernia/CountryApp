export const createCountryQuiz = () => {
  let chosenCountry;

  const getRandomCountry = (countryArray) => countryArray[Math.floor(Math.random() * countryArray.length + 1)];

  const prepareCountryToShow = (countryToGuess) => {
    const guessImg = document.querySelector('.modal-img');
    guessImg.src = countryToGuess.flag;
    guessImg.alt = countryToGuess.name;
  };

  const generateGuessCountryNameQuiz = (countryArray) => {
    chosenCountry = getRandomCountry(countryArray);
    prepareCountryToShow(chosenCountry);

    return chosenCountry;
  };

  const submitAnswer = (userAnswer, modal) => {
    const wasAnswerRightParagraph = document.querySelector('.is-answer-right');

    if (userAnswer.toLowerCase() === chosenCountry.name.toLowerCase()) {
      modal.classList.add('right-answer');
      wasAnswerRightParagraph.innerText = 'You are right!';
    } else {
      modal.classList.add('wrong-answer');
      wasAnswerRightParagraph.innerText = `Nope, right answer is ${chosenCountry.name}`;
    }
  };


  return {
    generateGuessCountryNameQuiz,
    submitAnswer,
  }
}
