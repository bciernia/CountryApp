export class CountryPopulationQuiz {
  #firstCountry;

  #secondCountry;

  #getRandomCountry(countryArray) {
    return countryArray[Math.floor(Math.random() * countryArray.length + 1)];
  }

  #getCountryWithHigherPopulation() {
    return this.#firstCountry.population > this.#secondCountry.population;
  }

  generateCountriesToCompare(countryArray) {
    this.#firstCountry = this.#getRandomCountry(countryArray);
    this.#secondCountry = this.#getRandomCountry(countryArray);

    return [this.#firstCountry, this.#secondCountry];
  }

  validateAnswer(isFirstCountrychosen) {
    const correctAnswer = this.#getCountryWithHigherPopulation();

    return isFirstCountrychosen === correctAnswer;
  }
}
