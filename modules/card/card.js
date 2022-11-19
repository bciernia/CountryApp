import { createCountryDetailsBtn } from '../../js/createCountryDetailsBtn.js';

export const createCard = (country, onDetailsBtnClick) => {
  const {
    name, capital, region, flag,
  } = country;
  const countryFlag = document.createElement('img');
  const countryNameH3 = document.createElement('h3');
  const countryRegionH3 = document.createElement('p');
  const countryCapitalH3 = document.createElement('p');
  const card = document.createElement('div');

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

  const btnCountryDetails = createCountryDetailsBtn(onDetailsBtnClick, ['btn', 'btn-country-info']);

  card.appendChild(countryFlag);
  card.appendChild(countryNameH3);
  card.appendChild(countryCapitalH3);
  card.appendChild(countryRegionH3);
  card.appendChild(btnCountryDetails);
  card.classList.add('country-info');

  return card;
};
