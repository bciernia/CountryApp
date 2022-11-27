import { createCard } from '../modules/design-system/card/card.js';
import { changeDialogueVisibility } from '../modules/design-system/dialogue/dialogue.js';
import { returnFilteredData, returnFilteredDataByUserString } from '../modules/country-app/filter/filter.js';
import { createCountryQuiz } from '../modules/country-app/quiz/quiz.js';

const COUNTRY_URL = 'https://restcountries.com/v3.1/all';

const countrySection = document.querySelector('.countries');
const btnCloseModalCountryInfo = document.querySelector('.btn-exit-info');
const btnCloseModalQuizPopulation = document.querySelector('.btn-exit-population');
const modalCountryInfo = document.querySelector('#modal-country');
const countryDetailsHeader = document.querySelector('.country-name');
const countryDetailsFlag = document.querySelector('.country-description-modal-flag');
const countryDetailsInfo = document.querySelector('.country-details');
const filterForm = document.querySelector('.form-filter');
const btnFiltersModal = document.querySelector('.btn-filters');
const filterByNameForm = document.querySelector('.filter-by-name');
const btnGuessModal = document.querySelector('.btn-guess-name');
const modalGuess = document.querySelector('.modal-guess');
const guessForm = document.querySelector('.guess-form');
const btnShowAll = document.querySelector('.btn-show-all');
const wasAnswerRightInfo = document.querySelector('.is-answer-right');
const btnSidebarTransition = document.querySelector('.btn-hide');
const sidebarSection = document.querySelector('.sidebar');
const guessMeter = document.querySelector('.guess-meter');
const sidebarFilters = document.querySelector('.sidebar-filters');
const checkboxRegion = document.getElementsByClassName('checkbox-region');
const btnGuessPopulationModal = document.querySelector('.btn-guess-population');
const modalQuizPopulation = document.querySelector('.modal-population');
const modalQuizFirstSection = document.querySelector('.modal-quiz-first');
const modalQuizSecondSection = document.querySelector('.modal-quiz-second');
const modalQuizPopulationForm = document.querySelector('.modal-population-form');

const checkboxRegionArr = [...checkboxRegion];
let countryArray = [];
let intervalId = 0;
let timeoutId = 0;

const countryQuiz = createCountryQuiz();

const renderCountries = (countryList) => {
  while (countrySection.firstChild) {
    countrySection.removeChild(countrySection.firstChild);
  }

  countryList.forEach((country) => {
    const {
      name, capital, region, flag, borders, population,
    } = country;

    const onBtnCountryClick = () => {
      changeDialogueVisibility(modalCountryInfo);

      modalCountryInfo.classList.add('modal-grid');
      countryDetailsFlag.src = flag;
      countryDetailsFlag.alt = name;
      countryDetailsHeader.innerText = name;
      countryDetailsInfo.innerText = `Capital: ${capital}\nRegion: ${region}\nPopulation: ${population}`;
    };
    const cardData = {
      img: {
        src: flag,
        alt: `${name} flag`,
      },
      headerText: name,
      additionalText1: capital || 'None',
      additionalText2: region,
      action: {
        text: 'Details',
        additionalClasses: ['btn', 'btn-country-info'],
        onClick: onBtnCountryClick,
      },
    };
    const card = createCard(cardData);
    countrySection.appendChild(card);
  });
};

fetch(COUNTRY_URL)
  .then((response) => response.json())
  .then((data) => {
    countryArray = data.map((country) => ({
      name: country.name.common,
      capital: country.capital && country.capital[0],
      region: country.region,
      flag: country.flags.png,
      population: country.population,
      mapPos: country.maps.googleMaps,
      borders: country.borders,
    }));
    renderCountries(countryArray);
  });

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const chosenFilters = [...Array.from(filterForm.getElementsByTagName('input'))];
  const filteredData = returnFilteredData(chosenFilters, countryArray);

  renderCountries(filteredData);
});

filterByNameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const valueFromUser = document.querySelector('.filter-by-name-input').value;
  const filteringType = document.querySelector('.radio-includes-name-filter').checked;
  const arrayToReturn = returnFilteredDataByUserString(valueFromUser, countryArray, filteringType);

  renderCountries(arrayToReturn);
});

btnCloseModalCountryInfo.addEventListener('click', () => {
  changeDialogueVisibility(modalCountryInfo);
});

btnCloseModalQuizPopulation.addEventListener('click', () => {
  clearTimeout(timeoutId);
  modalQuizPopulation.removeChild(modalQuizPopulation.lastChild);
  modalQuizPopulationForm.querySelector('button').style.display = 'inline-block';
  changeDialogueVisibility(modalQuizPopulation);
});

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputGuess = document.querySelector('.input-guess');
  const userAnswer = inputGuess.value;

  clearInterval(intervalId);
  clearTimeout(timeoutId);

  countryQuiz.submitAnswer(userAnswer, modalGuess);
  inputGuess.style.visibility = 'hidden';

  setTimeout(() => {
    changeDialogueVisibility(modalGuess);
  }, 2000);
});

const noAnswer = (countryToGuess) => {
  modalGuess.classList.add('wrong-answer');
  wasAnswerRightInfo.innerText = `Right answer is ${countryToGuess.name}`;
  setTimeout(() => {
    changeDialogueVisibility(modalGuess);
  }, 2000);
};

btnGuessModal.addEventListener('click', () => {
  changeDialogueVisibility(modalGuess);

  const countryToGuess = countryQuiz.generateGuessCountryNameQuiz(countryArray);

  wasAnswerRightInfo.innerText = '';
  document.querySelector('.input-guess').style.visibility = 'visible';
  document.querySelector('.input-guess').value = '';

  guessMeter.value = 100;
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  intervalId = setInterval(() => {
    guessMeter.value -= 1;
  }, 100);

  timeoutId = setTimeout(() => {
    noAnswer(countryToGuess);
  }, 10000);
});

btnShowAll.addEventListener('click', (event) => {
  event.preventDefault();
  renderCountries(countryArray);
});

btnSidebarTransition.addEventListener('click', () => {
  sidebarSection.classList.toggle('sidebar-active');
});

btnFiltersModal.addEventListener('click', () => {
  sidebarFilters.classList.toggle('sidebar-filters-active');
});

checkboxRegionArr.forEach((checkboxElement) => {
  checkboxElement.addEventListener('click', () => {
    checkboxElement.classList.toggle('checked');
    const checkboxC = checkboxElement.firstChild;
    checkboxC.nextSibling.checked = !checkboxC.nextSibling.checked;
  });
});

const generateCountriesToCompare = (section, country) => {
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
};

const clearSection = (sections) => {
  sections.forEach((section) => {
    section.textContent = '';
  });
};

const drawCountriesToQuiz = () => {
  const firstCountry = countryArray[Math.floor(Math.random() * countryArray.length + 1)];
  const secondCountry = countryArray[Math.floor(Math.random() * countryArray.length + 1)];

  return [firstCountry, secondCountry];
};

let firstCountry;
let secondCountry;

btnGuessPopulationModal.addEventListener('click', () => {
  changeDialogueVisibility(modalQuizPopulation);
  clearSection([modalQuizFirstSection, modalQuizSecondSection]);
  [firstCountry, secondCountry] = drawCountriesToQuiz();
  generateCountriesToCompare(modalQuizFirstSection, firstCountry);
  generateCountriesToCompare(modalQuizSecondSection, secondCountry);
});

const addHiddenInformation = (section, infoToShow) => {
  const information = document.createElement('p');
  information.innerText = infoToShow;
  information.classList.add('info-margin');
  section.appendChild(information);
};

modalQuizPopulationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstOption = modalQuizFirstSection.querySelector('input');
  const secondOption = modalQuizSecondSection.querySelector('input');
  const isFirstHigher = firstCountry.population > secondCountry.population;

  modalQuizPopulationForm.querySelector('button').style.display = 'none';
  addHiddenInformation(modalQuizFirstSection, `Population: ${firstCountry.population}`);
  addHiddenInformation(modalQuizSecondSection, `Population: ${secondCountry.population}`);
  if ((isFirstHigher && firstOption.checked) || (!isFirstHigher && secondOption.checked)) {
    modalQuizPopulation.classList.add('right-answer');
    addHiddenInformation(modalQuizPopulation, '\n\nCorrect!');
  } else {
    modalQuizPopulation.classList.add('wrong-answer');
    addHiddenInformation(modalQuizPopulation, '\n\nWrong answer!');
  }

  timeoutId = setTimeout(() => {
    modalQuizPopulation.removeChild(modalQuizPopulation.lastChild);
    modalQuizPopulationForm.querySelector('button').style.display = 'inline-block';
    changeDialogueVisibility(modalQuizPopulation);
  }, 5000);
});
