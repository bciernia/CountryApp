// export const createCountryQuiz = () => {
//     let chosenCountry;
//
//     const getRandomCountry = (countryArray) => countryArray[Math.floor(Math.random() * countryArray.length + 1)];
//
//     const generateGuessCountry = (countryArray) => {
//         chosenCountry = getRandomCountry(countryArray);
//
//         return chosenCountry;
//     }
//
//     const validateAnswer = (userAnswer) => ({
//         isAnswerCorrect: userAnswer.toLowerCase() === chosenCountry.name.toLowerCase(),
//         chosenCountry
//     })
//
//     return {
//         generateGuessCountry,
//         validateAnswer
//     }
// }

export class CountryQuiz {
    #chosenCountry;

    #getRandomCountry(countryArray){
      return countryArray[Math.floor(Math.random() * countryArray.length + 1)];
    }

    generateGuessCountry(countryArray) {
        this.#chosenCountry = this.#getRandomCountry(countryArray)
        return this.#chosenCountry;
    }

    validateAnswer(userAnswer) {
        return {
            isAnswerCorrect: userAnswer.toLowerCase() === this.#chosenCountry.name.toLowerCase(),
            chosenCountry: this.#chosenCountry
        }
    }

}