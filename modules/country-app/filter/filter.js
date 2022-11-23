const getValuesFromCheckedCheckboxes = (checkboxesElements) => checkboxesElements.reduce(
  (values, checkboxEl) => (checkboxEl.checked ? [...values, checkboxEl.value] : values),
  [],
);

const filterDataByField = (fieldName, values, dataArray) => dataArray.filter((data) => values.includes(data[fieldName]));

const filterDataByRegions = (regions, dataArray) => filterDataByField('region', regions, dataArray);

const filterDataByNames = (names, dataArray) => filterDataByField('name', names, dataArray);

export const returnFilteredData = (regionCheckboxes, dataArray) => {
  if (typeof regionCheckboxes === 'string') {
    // $TODO filtering by name ???
  } else {
    const regions = getValuesFromCheckedCheckboxes(regionCheckboxes);
    return filterDataByRegions(regions, dataArray);
  }
};
