export const fetchJson = (url, converter) => fetch(url)
  .then((response) => response.json())
  .then(converter);
