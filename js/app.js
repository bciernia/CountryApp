import { createCard } from '../modules/design-system/card/card.js';
import { changeDialogueVisibility } from '../modules/design-system/dialogue/dialogue.js';
import { returnFilteredData, returnFilteredDataByUserString } from '../modules/country-app/filter/filter.js';
import { createCountryQuizModal } from '../modules/country-app/quiz-country-name/quiz-modal-factory.js';
import { fetchCountries } from '../modules/country-app/data/data.js';
import { createCountryPopulationQuizModal } from '../modules/country-app/quiz-country-population/quiz-population-factory.js';

const countrySection = document.querySelector('.countries');
const btnCloseModalCountryInfo = document.querySelector('.btn-exit-info');
const modalCountryInfo = document.getElementById('modal-country');
const countryDetailsHeader = document.querySelector('.country-name');
const countryDetailsFlag = document.querySelector('.country-description-modal-flag');
const countryDetailsInfo = document.querySelector('.country-details');
const countryBorderCountries = document.querySelector('.border-countries');
const filterForm = document.querySelector('.form-filter');
const btnFiltersModal = document.querySelector('.btn-filters');
const filterByNameForm = document.querySelector('.filter-by-name');
const btnShowAll = document.querySelector('.btn-show-all');
const btnSidebarTransition = document.querySelector('.btn-hide');
const sidebarSection = document.querySelector('.sidebar');
const sidebarFilters = document.querySelector('.sidebar-filters');
const checkboxRegion = document.getElementsByClassName('checkbox-region');

const quizModal = createCountryQuizModal();
const quizPopulationModal = createCountryPopulationQuizModal();

let countryArray = [];

const checkboxRegionArr = [...checkboxRegion];
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

      countryDetailsFlag.src = flag;
      countryDetailsFlag.alt = name;
      countryDetailsHeader.innerText = name;
      countryDetailsInfo.innerText = `Capital: ${capital}\nRegion: ${region}\nPopulation: ${population}`;

      if (country.borders !== undefined) {
        modalCountryInfo.classList.add('modal-grid');
        modalCountryInfo.querySelector('.country-info').classList.remove('country-without-bordering-countries');
        countryList.forEach((borderingCountry) => {
          if (borders.includes(borderingCountry.cca3)) {
            const borderCountryFlag = document.createElement('img');
            borderCountryFlag.src = borderingCountry.flag;
            borderCountryFlag.alt = borderingCountry.name;
            borderCountryFlag.classList.add('border-country-flag-desc');
            countryBorderCountries.appendChild(borderCountryFlag);
          }
        });
      } else {
        modalCountryInfo.querySelector('.country-info').classList.add('country-without-bordering-countries');
        countryBorderCountries.innerText = 'Country doesn\'t border other countries';
      }
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

fetchCountries().then((data) => {
  renderCountries(data);
  quizModal.updateCountryArray(data);
  quizPopulationModal.updateCountryArray(data);
  countryArray = data;
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
  countryBorderCountries.innerText = '';
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
