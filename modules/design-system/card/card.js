import {
  createBtn, createDiv, createH3, createImg, createParagraph,
} from '../core/core.js';

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
