const createBtn = (text, additionalClasses, onClickHandler) => {
  const btn = document.createElement('button');

  btn.classList.add(...additionalClasses);
  btn.textContent = text;
  btn.addEventListener('click', onClickHandler);

  return btn;
};

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

export const createCard = ({
  img, headerText, additionalText1, additionalText2, action,
}) => {
  const card = createDiv(['card-info']);
  const imgCard = createImg(img.src, img.alt, ['card-img']);
  const headerCardText = createH3(headerText);
  const additionalCardText1 = createParagraph(additionalText1);
  const additionalCardText2 = createParagraph(additionalText2);
  const actionCardBtn = createBtn(action.text, action.additionalClasses, action.onClick);

  card.appendChild(imgCard);
  card.appendChild(headerCardText);
  card.appendChild(additionalCardText1);
  card.appendChild(additionalCardText2);
  card.appendChild(actionCardBtn);

  return card;
};
