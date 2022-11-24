const CSS_CLASSES = {
  MODAL: 'modal',
  MODAL_ACTIVE: 'modal-active',
  BLURRED_BACKGROUND: 'blurred-background',
};

/** @description
 * Function which returns true for elements div...
 */
const isContainerNodeType = (element) => element.nodeType === 1;

const getSiblingsOfElement = (elem) => {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (isContainerNodeType(sibling) && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

const setBackgroundBlurred = (sectionsToBlur) => {
  sectionsToBlur.forEach((section) => {
    section.classList.toggle(CSS_CLASSES.BLURRED_BACKGROUND);
  });
};

export const changeDialogueVisibility = (dialogue) => {
  const contentToBlur = document.querySelector('#content');
  contentToBlur.classList.toggle(CSS_CLASSES.BLURRED_BACKGROUND);
  const shouldShowModal = !(dialogue.classList.contains(CSS_CLASSES.MODAL_ACTIVE));

  dialogue.classList.remove(...dialogue.classList);
  dialogue.classList.add(CSS_CLASSES.MODAL);
  if (shouldShowModal) {
    dialogue.classList.add(CSS_CLASSES.MODAL_ACTIVE);
  }
};
