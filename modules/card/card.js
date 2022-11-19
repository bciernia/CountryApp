import { createCountryDetailsBtn } from '../../js/createCountryDetailsBtn.js';

const createImg = (src, alt, additionalClasses) => {
  const img = document.createElement('img');

  img.src = src;
  img.alt = alt;
  img.classList.add(...additionalClasses);

  return img;
};

const createH3 = (text) => {
  const h3 = document.createElement('h3');
  h3.innerText = text;

  return h3;
};

const createParagraph = (text) => {
  const p = document.createElement('p');
  p.innerText = text;

  return p;
};

const createDiv = (additionalClasses) => {
  const div = document.createElement('div');
  div.classList.add(...additionalClasses);

  return div;
};

export const createCard = (country, onDetailsBtnClick) => {
  const {
    name, capital, region, flag,
  } = country;

  const card = createDiv(['card-info']);
  const countryFlag = createImg(flag, `${name} flag`, ['card-img']);
  const countryNameH3 = createH3(name);
  const countryCapitalH3 = createParagraph(capital || 'None');
  const countryRegionH3 = createParagraph(region);
  const btnCountryDetails = createCountryDetailsBtn(onDetailsBtnClick, ['btn', 'btn-country-info']);

  card.appendChild(countryFlag);
  card.appendChild(countryNameH3);
  card.appendChild(countryCapitalH3);
  card.appendChild(countryRegionH3);
  card.appendChild(btnCountryDetails);

  return card;
};
