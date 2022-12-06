// export class CountryPopulationQuiz {
//   #firstCountry;
//
//   #secondCountry;
//
//   #getRandomCountry(countryArray) {
//     return countryArray[Math.floor(Math.random() * countryArray.length + 1)];
//   }
//
//   #getCountryWithHigherPopulation() {
//     return this.#firstCountry.population > this.#secondCountry.population;
//   }
//
//   generateCountriesToCompare(countryArray) {
//     this.#firstCountry = this.#getRandomCountry(countryArray);
//     this.#secondCountry = this.#getRandomCountry(countryArray);
//
//     return [this.#firstCountry, this.#secondCountry];
//   }
//
//   validateAnswer(isFirstCountrychosen) {
//     const correctAnswer = this.#getCountryWithHigherPopulation();
//
//     return isFirstCountrychosen === correctAnswer;
//   }
// }

export class CountryPopulationQuiz {
  #selectedCountries = [];

  #getRandomCountry(countryArray) {
    return countryArray[Math.floor(Math.random() * countryArray.length + 1)];
  }

  #getCountryWithHigherPopulation() {
    return this.#selectedCountries[0].population > this.#selectedCountries[1].population ? this.#selectedCountries[0] : this.#selectedCountries[1];
  }

  generateCountriesToCompare(countryArray) {
    this.#selectedCountries = [this.#getRandomCountry(countryArray), this.#getRandomCountry(countryArray)];

    /** @description
     * We can compare population instead of names because:
     * 1. The same countries will have the same population
     * 2. We don't want to allow choose different countries with the same population
     */
    if (this.#selectedCountries[0].population === this.#selectedCountries[1].population) {
      return this.generateCountriesToCompare(countryArray);
    }

    return this.#selectedCountries;
  }

  validateAnswer(countryName) {
    const country = this.#getCountryWithHigherPopulation();

    return country.name === countryName;
  }
}
