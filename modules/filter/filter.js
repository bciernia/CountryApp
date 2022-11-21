const getChosenFilters = (filterOptions) => {
  const filtersToReturn = filterOptions.map((option) => {
    if (option.checked) {
      return option.value;
    }
    return false;
  }).filter((option) => option ?? false);

  return filtersToReturn;
};

const getDataFromCheckboxFilter = (chosenFilter, dataArray) => {
  const filters = getChosenFilters(chosenFilter);
  const filteredData = [];

  for (let i = 0; i < filters.length; i += 1) {
    for (let j = 0; j < dataArray.length; j += 1) {
      if (dataArray[j].region === filters[i]) {
        filteredData.push(dataArray[j]);
      }
    }
  }

  return filteredData;
};

export const returnFilteredData = (chosenFilter, dataArray) => {
  if (typeof chosenFilter === 'string') {
    // $TODO filtering by name ???
  } else {
    return getDataFromCheckboxFilter(chosenFilter, dataArray);
  }
};
