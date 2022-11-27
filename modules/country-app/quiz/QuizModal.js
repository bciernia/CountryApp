import { changeDialogueVisibility } from '../../design-system/dialogue/dialogue.js';
import { createCountDownMeter } from '../../design-system/meter/meter.js';

export class QuizModal {
  #countryArray = [];

  #modalGuess = null;

  #guessForm = null;

  #btnGuessModal = null;

  #wasAnswerRightInfo = null;

  #inputGuess = null;

  #guessImg = null;

  #meter = null;

  #btnSubmitAnswer = null;

  constructor(countryQuiz) {
    this.#modalGuess = document.querySelector('.modal-guess');
    this.#guessForm = document.querySelector('.guess-form');
    this.#btnGuessModal = document.querySelector('.btn-guess-name');
    this.#wasAnswerRightInfo = document.querySelector('.is-answer-right');
    this.#inputGuess = this.#modalGuess.querySelector('.input-guess');
    this.#guessImg = document.querySelector('.modal-img');
    this.#btnSubmitAnswer = this.#modalGuess.querySelector('.btn-submit-answer');

    const guessMeter = document.querySelector('.guess-meter');
    this.#meter = createCountDownMeter(guessMeter);

    this.#btnGuessModal.addEventListener('click', () => {
      this.#createQuizModal(countryQuiz);
    });

    this.#guessForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#checkIfAnswerWasRight(countryQuiz);
    });
  }

  #updateContent({ isSuccess, textInfo }) {
    if (isSuccess != undefined) {
      this.#modalGuess.classList.add(isSuccess ? 'right-answer' : 'wrong-answer');
    }

    this.#wasAnswerRightInfo.innerText = textInfo;
  }

  #noAnswer(countryToGuess) {
    this.#updateContent({ isSuccess: false, textInfo: `Right answer is ${countryToGuess.name}` });
    this.#updateInput({ isVisible: false, value: '' });
    this.#updateBtn({ isVisible: false });

    setTimeout(() => {
      changeDialogueVisibility(this.#modalGuess);
    }, 2_000);
  }

  #createQuizModal(countryQuiz) {
    changeDialogueVisibility(this.#modalGuess);

    const countryToGuess = countryQuiz.generateGuessCountry(this.#countryArray);
    this.#updateCountryFlag(countryToGuess);

    this.#updateBtn({ isVisible: true });
    this.#updateContent({ textInfo: '' });
    this.#updateInput({ isVisible: true, value: '' });

    this.#meter.start(() => this.#noAnswer(countryToGuess));
  }

  #checkIfAnswerWasRight(countryQuiz) {
    const userAnswer = this.#inputGuess.value;
    this.#meter.stop();

    const { isAnswerCorrect, chosenCountry } = countryQuiz.validateAnswer(userAnswer, this);

    isAnswerCorrect
      ? this.#updateContent({ isSuccess: true, textInfo: 'You are right!' })
      : this.#updateContent({ isSuccess: false, textInfo: `Nope, right answer is ${chosenCountry.name}` });

    this.#updateBtn({ isVisible: false });
    this.#updateInput({ isVisible: false, value: '' });

    setTimeout(() => {
      changeDialogueVisibility(this.#modalGuess);
    }, 2_000);
  }

  #updateBtn({ isVisible }) {
    this.#btnSubmitAnswer.style.visibility = isVisible ? 'visible' : 'hidden';
  }

  #updateInput({ isVisible, value }) {
    this.#inputGuess.value = value;
    this.#inputGuess.style.visibility = isVisible ? 'visible' : 'hidden';
  }

  #updateCountryFlag(countryToGuess) {
    this.#guessImg.src = countryToGuess.flag;
    this.#guessImg.alt = countryToGuess.name;
  }

  updateCountryArray(countryArray) {
    this.#countryArray = countryArray;
  }
}
