import { fetchJson } from '../../design-system/data/fetchJson.js';

const COUNTRY_URL = 'https://restcountries.com/v3.1/all';

const mapDataToCountryArray = (data) => data.map((country) => ({
  name: country.name.common,
  capital: country.capital && country.capital[0],
  region: country.region,
  flag: country.flags.png,
  population: country.population,
  mapPos: country.maps.googleMaps,
  borders: country.borders,
}));

export const fetchCountries = () => fetchJson(COUNTRY_URL, mapDataToCountryArray);
