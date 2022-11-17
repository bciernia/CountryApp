const countrySection = document.querySelector('.countries');
const btnCloseModalCountryInfo = document.querySelector('.btn-exit-info');
const btnCloseModalFilter = document.querySelector('.btn-exit-filter');
const modalCountryInfo = document.querySelector('.modal-country');
const mainContent = document.querySelector('#main-content');
const countryDetailsHeader = document.querySelector('.country-name');
const countryDetailsFlag = document.querySelector('.country-modal-flag');
const countryDetailsInfo = document.querySelector('.country-details');
const filterForm = document.querySelector('.form-filter');
const btnFiltersModal = document.querySelector('.btn-filters');
const modalFilter = document.querySelector('.modal-filter');
const filterByNameForm = document.querySelector('.filter-by-name');
const filterSelect = document.querySelector('[name="filter-country-region"]');
const btnGuessModal = document.querySelector('.btn-guess');
const modalGuess = document.querySelector('.modal-guess');
const guessForm = document.querySelector('.guess-form');
const btnShowAll = document.querySelector('.btn-show-all');
const wasAnswerRightInfo = document.querySelector('.is-answer-right');
const btnSidebarTransition = document.querySelector('.btn-hide');
const sidebarSection = document.querySelector('.sidebar');
const guessMeter = document.querySelector('.guess-meter');
const sidebarFilters = document.querySelector('.sidebar-filters');
const checkboxRegion = document.getElementsByClassName('checkbox-region');

const checkboxRegionArr = [...checkboxRegion];
let countryToGuess = {};
let countryArray = [];
let intervalId = 0;
let timeoutId = 0;

const createCountryDetailsBtn = (onClickHandler, additionalClasses) => {
  const btnCountryDetails = document.createElement('button');

  btnCountryDetails.classList.add(...additionalClasses);
  btnCountryDetails.textContent = 'Details';
  btnCountryDetails.addEventListener('click', onClickHandler);

  return btnCountryDetails;
};

const renderCountries = (countryList) => {
  while (countrySection.firstChild) {
    countrySection.removeChild(countrySection.firstChild);
  }

  countryList.forEach((country) => {
    const {
      name, capital, region, flag,
    } = country;
    const countryFlag = document.createElement('img');
    const countryNameH3 = document.createElement('h3');
    const countryRegionH3 = document.createElement('p');
    const countryCapitalH3 = document.createElement('p');
    const newDiv = document.createElement('div');

    countryFlag.src = flag;
    countryFlag.alt = `${name} flag`;
    countryFlag.classList.add('country-flag-img');
    countryNameH3.innerText = name;

    countryRegionH3.innerText = region;

    if (capital !== undefined) {
      countryCapitalH3.innerText = capital;
    } else {
      countryCapitalH3.innerText = 'None';
    }

    const onBtnCountryClick = () => {
      modalCountryInfo.classList.toggle('modal-active');
      mainContent.classList.toggle('disabled-background');
      countryDetailsFlag.src = flag;
      countryDetailsFlag.alt = name;
      countryDetailsHeader.innerText = name;
      countryDetailsInfo.innerText = `Capital: ${capital}\nRegion: ${region}`;
    };

    const btnCountryDetails = createCountryDetailsBtn(onBtnCountryClick, ['btn', 'btn-country-info']);

    newDiv.appendChild(countryFlag);
    newDiv.appendChild(countryNameH3);
    newDiv.appendChild(countryCapitalH3);
    newDiv.appendChild(countryRegionH3);
    newDiv.appendChild(btnCountryDetails);
    newDiv.classList.add('country-info');

    countrySection.appendChild(newDiv);
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

filterSelect.addEventListener('change', () => {
  const array = countryArray.filter((country) => country.region.includes(
    filterSelect.options[filterSelect.selectedIndex].value,
  ));
  renderCountries(array);
});

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
  // modalFilter.classList.toggle('modal-active');
  // mainContent.classList.toggle('disabled-background');
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
  mainContent.classList.toggle('disabled-background');
});

btnCloseModalFilter.addEventListener('click', () => {
  modalFilter.classList.toggle('modal-active');
  mainContent.classList.toggle('disabled-background');
});

const hideModal = (modal) => {
  modal.classList.toggle('modal-active');
  mainContent.classList.toggle('disabled-background');
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
  mainContent.classList.toggle('disabled-background');
  const guessImg = document.querySelector('.country-modal-flag-to-guess');
  countryToGuess = countryArray[Math.ceil(Math.random() * countryArray.length + 1)];
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
