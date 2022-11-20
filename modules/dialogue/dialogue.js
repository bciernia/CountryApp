const getSiblingsOfElement = (elem) => {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

const setBackgroundBlured = (sectionsToBlur) => {
  sectionsToBlur.forEach((section) => {
    section.classList.toggle('disabled-background');
  });
};

export const changeDialogueVisibility = (dialogue) => {
  const sectionsToBlur = getSiblingsOfElement(dialogue);
  const shouldShowModal = !(dialogue.classList.contains('modal-active'));

  dialogue.classList.remove(...dialogue.classList);
  dialogue.classList.toggle('modal');
  if (shouldShowModal) {
    dialogue.classList.toggle('modal-active');
  }
  setBackgroundBlured(sectionsToBlur);
};
