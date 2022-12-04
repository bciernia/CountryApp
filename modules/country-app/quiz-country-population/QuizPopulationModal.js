import { changeDialogueVisibility } from '../../design-system/dialogue/dialogue.js';

export class QuizPopulationModal {
  #countryArray = [];

  #modal = null;

  #guessForm = null;

  #firstCountry = null;

  #secondCountry = null;

  #firstCountrySection = null;

  #secondCountrySection = null;

  #btnGuessPopulationModal = null;

  #btnCloseModal = null;

  #isAnswerCorrect = null;

  constructor(countryPopulationQuiz) {
    this.#modal = document.querySelector('.modal-population');
    this.#guessForm = document.querySelector('.modal-population-form');
    this.#firstCountrySection = document.querySelector('.modal-quiz-first');
    this.#secondCountrySection = document.querySelector('.modal-quiz-second');
    this.#btnGuessPopulationModal = document.querySelector('.btn-guess-population');
    this.#btnCloseModal = document.querySelector('.btn-exit-population');
    this.#isAnswerCorrect = document.querySelector('.is-answer-correct');

    this.#btnGuessPopulationModal.addEventListener('click', () => {
      this.#createPopulationQuizModal(countryPopulationQuiz);
    });

    this.#guessForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#checkIfAnswerWasRight(countryPopulationQuiz);
    });

    this.#btnCloseModal.addEventListener('click', () => {
      this.#guessForm.querySelector('button').style.display = 'inline-block';
      changeDialogueVisibility(this.#modal);
    });
  }

  #clearSection(sections) {
    sections.forEach((section) => {
      section.textContent = '';
    });
  }

  #addHiddenInformation(section, infoToShow) {
    const information = document.createElement('p');
    information.innerText = infoToShow;
    information.classList.add('info-margin');
    section.appendChild(information);
  }

  #generateCountriesToCompare(section, country) {
    const container = document.createElement('div');
    container.classList.add('radio-toolbar');
    const radioInput = document.createElement('input');
    const radioLabel = document.createElement('label');
    const flag = document.createElement('img');
    const countryName = document.createElement('h3');
    radioInput.type = 'radio';
    radioInput.name = 'country-population-radio';
    radioInput.id = `${country.name}-radio`;
    radioLabel.htmlFor = `${country.name}-radio`;
    flag.src = country.flag;
    flag.alt = country.name;
    flag.classList.add('modal-img');
    countryName.innerText = country.name;
    countryName.classList.add('country-name');
    radioLabel.appendChild(flag);
    radioLabel.appendChild(countryName);
    container.appendChild(radioInput);
    container.appendChild(radioLabel);
    section.appendChild(container);
  }

  #updateContent({ isSuccess, textInfo }) {
    if (isSuccess !== undefined) {
      this.#modal.classList.add(isSuccess ? 'correct-answer' : 'wrong-answer');
    }
    this.#isAnswerCorrect.innerText = textInfo;
  }

  #createPopulationQuizModal(countryPopulationQuiz) {
    changeDialogueVisibility(this.#modal);
    this.#updateContent({ textInfo: '' });
    this.#clearSection([this.#firstCountrySection, this.#secondCountrySection]);
    [this.#firstCountry, this.#secondCountry] = countryPopulationQuiz.generateCountriesToCompare(this.#countryArray);

    this.#generateCountriesToCompare(this.#firstCountrySection, this.#firstCountry);
    this.#generateCountriesToCompare(this.#secondCountrySection, this.#secondCountry);
  }

  #checkIfAnswerWasRight(countryPopulationQuiz) {
    const firstOption = this.#firstCountrySection.querySelector('input');

    const isAnswerCorrect = countryPopulationQuiz.validateAnswer(firstOption.checked);

    this.#addHiddenInformation(this.#firstCountrySection, `Population: ${this.#firstCountry.population}`);
    this.#addHiddenInformation(this.#secondCountrySection, `Population: ${this.#secondCountry.population}`);

    isAnswerCorrect
      ? this.#updateContent({ isSuccess: true, textInfo: 'Correct!' })
      : this.#updateContent({ isSuccess: false, textInfo: 'Wrong!' });

    this.#guessForm.querySelector('button').style.display = 'none';
  }

  updateCountryArray(countryArray) {
    this.#countryArray = countryArray;
  }
}
