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

export const createH3 = (text) => {
  const h3 = document.createElement('h3');

  h3.innerText = text;

  return h3;
};

export const createParagraph = (text) => {
  const p = document.createElement('p');

  p.innerText = text;

  return p;
};

export const createDiv = (additionalClasses) => {
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
