export const createBtn = (text, additionalClasses, onClickHandler) => {
  const btn = document.createElement('button');

  btn.classList.add(...additionalClasses);
  btn.textContent = text;
  btn.addEventListener('click', onClickHandler);

  return btn;
};

export const createImg = (src, alt, additionalClasses) => {
  const img = document.createElement('img');

  img.src = src;
  img.alt = alt;
  img.classList.add(...additionalClasses);

  return img;
};

export const createH3 = (text, additionalClasses = []) => {
  const h3 = document.createElement('h3');

  h3.innerText = text;
  h3.classList.add(...additionalClasses);

  return h3;
};

export const createParagraph = (text, additionalClasses = []) => {
  const p = document.createElement('p');

  p.innerText = text;
  p.classList.add(...additionalClasses);

  return p;
};

export const createDiv = (additionalClasses = []) => {
  const div = document.createElement('div');

  div.classList.add(...additionalClasses);

  return div;
};

export const createRadio = (id, name, value) => {
  const radio = document.createElement('input');

  radio.id = id;
  radio.name = name;
  radio.value = value;
  radio.type = 'radio';

  return radio;
};

export const createLabel = (inputName) => {
  const label = document.createElement('label');

  label.htmlFor = inputName;

  return label;
};
