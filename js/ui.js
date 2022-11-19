import { createCard } from '../modules/card/card.js';

const countrySection = document.querySelector('.countries');
const btnCloseModalCountryInfo = document.querySelector('.btn-exit-info');
const btnCloseModalQuizPopulation = document.querySelector('.btn-exit-population');
const modalCountryInfo = document.querySelector('.modal-country');
const countryDetailsHeader = document.querySelector('.country-name');
const countryDetailsFlag = document.querySelector('.country-modal-flag');
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
const mainSection = document.querySelector('.main-section');
const btnGuessPopulationModal = document.querySelector('.btn-guess-population');
const modalQuizPopulation = document.querySelector('.modal-population');
const modalQuizLeftSection = document.querySelector('.modal-quiz-left');
const modalQuizRightSection = document.querySelector('.modal-quiz-right');
const modalQuizPopulationForm = document.querySelector('.modal-population-form');

const checkboxRegionArr = [...checkboxRegion];
let countryToGuess = {};
let countryArray = [];
let intervalId = 0;
let timeoutId = 0;

const renderCountries = (countryList) => {
  while (countrySection.firstChild) {
    countrySection.removeChild(countrySection.firstChild);
  }

  countryList.forEach((country) => {
    const {
      name, capital, region, flag,
    } = country;

    const onBtnCountryClick = () => {
      modalCountryInfo.classList.toggle('modal-active');
      mainSection.classList.toggle('disabled-background');
      sidebarSection.classList.toggle('disabled-background');
      countryDetailsFlag.src = flag;
      countryDetailsFlag.alt = name;
      countryDetailsHeader.innerText = name;
      countryDetailsInfo.innerText = `Capital: ${capital}\nRegion: ${region}`;
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

fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((data) => {
    countryArray = data.map((country) => ({
      name: country.name.common,
      capital: country.capital && country.capital[0],
      region: country.region,
      flag: country.flags.png,
      population: country.population,
      mapPos: country.maps.googleMaps,
    }));
    renderCountries(countryArray);
  });

// filterSelect.addEventListener('change', () => {
//   const array = countryArray.filter((country) => country.region.includes(
//     filterSelect.options[filterSelect.selectedIndex].value,
//   ));
//   renderCountries(array);
// });

filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const arrayToReturn = [];

  const checkboxList = Array.prototype.slice.call(
    filterForm.getElementsByTagName('input'),
  );

  const chosenFilter = checkboxList
    .map((item) => {
      if (item.checked) {
        return item.value;
      }
      return false;
    })
    .filter((item) => {
      if (item !== 'undefined') {
        return item;
      }
      return false;
    });

  if (chosenFilter.length === 0) {
    renderCountries(countryArray);
  } else {
    for (let i = 0; i < chosenFilter.length; i += 1) {
      for (let j = 0; j < countryArray.length; j += 1) {
        if (countryArray[j].region === chosenFilter[i]) { arrayToReturn.push(countryArray[j]); }
      }
    }
    renderCountries(arrayToReturn);
  }
});

filterByNameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const arrayToReturn = [];

  const valueFromUser = document.querySelector('.filter-by-name-input').value;
  if (document.querySelector('.radio-includes-name-filter').checked === true) {
    countryArray.forEach((country) => {
      if (country.name.includes(valueFromUser)) {
        arrayToReturn.push(country);
      }
    });
  } else {
    countryArray.forEach((country) => {
      if (country.name.startsWith(valueFromUser)) {
        arrayToReturn.push(country);
      }
    });
  }
  renderCountries(arrayToReturn);
});

btnCloseModalCountryInfo.addEventListener('click', () => {
  modalCountryInfo.classList.toggle('modal-active');
  mainSection.classList.toggle('disabled-background');
  sidebarSection.classList.toggle('disabled-background');
});

btnCloseModalQuizPopulation.addEventListener('click', () => {
  clearTimeout(timeoutId);
  modalQuizPopulation.removeChild(modalQuizPopulation.lastChild);
  modalQuizPopulationForm.querySelector('button').style.display = 'inline-block';
  modalQuizPopulation.classList.toggle('modal-active');
  mainSection.classList.toggle('disabled-background');
  sidebarSection.classList.toggle('disabled-background');
});

const hideModal = (modal) => {
  modal.classList.toggle('modal-active');
  mainSection.classList.toggle('disabled-background');
  sidebarSection.classList.toggle('disabled-background');
};

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputGuess = document.querySelector('.input-guess');

  clearInterval(intervalId);
  clearTimeout(timeoutId);

  if (inputGuess.value.toLowerCase() === countryToGuess.name.toLowerCase()) {
    modalGuess.classList.add('right-answer');
    wasAnswerRightInfo.innerText = 'You are right!';
  } else {
    modalGuess.classList.add('wrong-answer');
    wasAnswerRightInfo.innerText = `Nope, right answer is ${countryToGuess.name}`;
  }
  inputGuess.style.visibility = 'hidden';

  setTimeout(() => {
    hideModal(modalGuess);
  }, 2000);
});

const noAnswer = () => {
  modalGuess.classList.add('wrong-answer');
  wasAnswerRightInfo.innerText = `Right answer is ${countryToGuess.name}`;
  setTimeout(() => {
    hideModal(modalGuess);
  }, 2000);
};

btnGuessModal.addEventListener('click', () => {
  modalGuess.classList.toggle('modal-active');
  mainSection.classList.toggle('disabled-background');
  sidebarSection.classList.toggle('disabled-background');
  const guessImg = document.querySelector('.country-modal-flag-to-guess');
  countryToGuess = countryArray[Math.floor(Math.random() * countryArray.length + 1)];
  guessImg.src = countryToGuess.flag;
  guessImg.alt = countryToGuess.name;
  modalGuess.classList.remove('right-answer');
  modalGuess.classList.remove('wrong-answer');
  wasAnswerRightInfo.innerText = '';
  document.querySelector('.input-guess').style.visibility = 'visible';
  document.querySelector('.input-guess').value = '';

  guessMeter.value = 100;
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  console.log(countryToGuess.name);
  intervalId = setInterval(() => {
    guessMeter.value -= 1;
  }, 100);

  timeoutId = setTimeout(() => {
    noAnswer();
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
    if (checkboxC.nextSibling.checked) {
      checkboxC.nextSibling.checked = false;
    } else {
      checkboxC.nextSibling.checked = true;
    }
  });
});

const generateCountriesToCompare = (section, country) => {
  const container = document.createElement('label');
  const radioInput = document.createElement('input');
  const flag = document.createElement('img');
  const countryName = document.createElement('h3');
  // container.classList.add('checkbox-region');
  radioInput.type = 'radio';
  radioInput.name = 'country-population-radio';
  radioInput.addEventListener('change', () => {
    if (radioInput.checked) {
      section.classList.toggle('checked-background');
    } else {
      section.classList.toggle('checked-background');
    }
  });
  flag.src = country.flag;
  flag.alt = country.name;
  flag.classList.add('country-flag-compare-population');
  countryName.innerText = country.name;
  countryName.classList.add('country-name');
  container.appendChild(radioInput);
  container.appendChild(flag);
  container.appendChild(countryName);
  section.appendChild(container);

  // const countryPopulation = document.createElement('p');
  // countryPopulation.innerText = `Population: ${firstCountry.population}`;
  // section.appendChild(countryPopulation);
};

const clearSection = (sectionsArray) => {
  sectionsArray.forEach((section) => {
    // eslint-disable-next-line no-param-reassign
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
  modalQuizPopulation.classList.remove('right-answer');
  modalQuizPopulation.classList.remove('wrong-answer');
  clearSection([modalQuizLeftSection, modalQuizRightSection]);
  modalQuizPopulation.classList.toggle('modal-active');
  mainSection.classList.toggle('disabled-background');
  sidebarSection.classList.toggle('disabled-background');
  [firstCountry, secondCountry] = drawCountriesToQuiz();
  generateCountriesToCompare(modalQuizLeftSection, firstCountry);
  generateCountriesToCompare(modalQuizRightSection, secondCountry);
});

const addHiddenInformation = (section, infoToShow) => {
  const information = document.createElement('p');
  information.innerText = infoToShow;
  information.classList.add('info-margin');
  section.appendChild(information);
};

modalQuizPopulationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const leftOption = modalQuizLeftSection.querySelector('input');
  const rightOption = modalQuizRightSection.querySelector('input');
  const isLeftHigher = firstCountry.population > secondCountry.population;

  modalQuizPopulationForm.querySelector('button').style.display = 'none';
  addHiddenInformation(modalQuizLeftSection, `Population: ${firstCountry.population}`);
  addHiddenInformation(modalQuizRightSection, `Population: ${secondCountry.population}`);
  modalQuizLeftSection.classList.remove('checked-background');
  modalQuizRightSection.classList.remove('checked-background');
  if ((isLeftHigher && leftOption.checked) || (!isLeftHigher && rightOption.checked)) {
    modalQuizPopulation.classList.add('right-answer');
    addHiddenInformation(modalQuizPopulation, 'Correct!');
  } else {
    modalQuizPopulation.classList.add('wrong-answer');
    addHiddenInformation(modalQuizPopulation, 'Wrong answer!');
  }

  timeoutId = setTimeout(() => {
    modalQuizPopulation.removeChild(modalQuizPopulation.lastChild);
    modalQuizPopulationForm.querySelector('button').style.display = 'inline-block';
    modalQuizPopulation.classList.toggle('modal-active');
    mainSection.classList.toggle('disabled-background');
    sidebarSection.classList.toggle('disabled-background');
  }, 5000);
});
