export const createCountryDetailsBtn = (onClickHandler, additionalClasses) => {
  const btnCountryDetails = document.createElement('button');

  btnCountryDetails.classList.add(...additionalClasses);
  btnCountryDetails.textContent = 'Details';
  btnCountryDetails.addEventListener('click', onClickHandler);

  return btnCountryDetails;
};
