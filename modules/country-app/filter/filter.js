const getValuesFromCheckedCheckboxes = (checkboxesElements) => checkboxesElements.reduce(
  (values, checkboxEl) => (checkboxEl.checked ? [...values, checkboxEl.value] : values),
  [],
);

const filterDataByField = (fieldName, values, dataArray) => dataArray.filter((data) => values.includes(data[fieldName]));

const filterDataByRegions = (regions, dataArray) => filterDataByField('region', regions, dataArray);

const filterDataWhichIncludesValueFromUser = (valueFromUser, dataArray) => {
  const arrayToReturn = [];

  dataArray.forEach((country) => {
    const lowercaseCountryName = (country.name).toLowerCase();
    if (lowercaseCountryName.includes(valueFromUser.toLowerCase())) {
      arrayToReturn.push(country);
    }
  });

  return arrayToReturn;
};

const filterDataWhichStartsWithValueFromUser = (valueFromUser, dataArray) => {
  const arrayToReturn = [];

  dataArray.forEach((country) => {
    const lowercaseCountryName = (country.name).toLowerCase();
    if (lowercaseCountryName.startsWith(valueFromUser.toLowerCase())) {
      arrayToReturn.push(country);
    }
  });

  return arrayToReturn;
};

export const returnFilteredDataByUserString = (userString, dataArray, isNameContainsValue) => {
  if (!isNameContainsValue) {
    return filterDataWhichStartsWithValueFromUser(userString, dataArray);
  }
  return filterDataWhichIncludesValueFromUser(userString, dataArray);
};

export const returnFilteredData = (regionCheckboxes, dataArray) => {
  const regions = getValuesFromCheckedCheckboxes(regionCheckboxes);
  return filterDataByRegions(regions, dataArray);
};
