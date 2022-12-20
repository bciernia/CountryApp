export class CountryStorage {
  #countriesMap = new Map();

  constructor(countries) {
    countries.forEach((country) => {
      this.#countriesMap.set(country.cca3, country);
    });
  }

  getAll() {
    return Array.from(this.#countriesMap.values());
  }

  getByCca3(cca3Arr) {
    return cca3Arr.map((cca3) => this.#countriesMap.get(cca3));
  }
}
