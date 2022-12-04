import { CountryPopulationQuiz } from './CountryPopulationQuiz.js';
import { QuizPopulationModal } from './QuizPopulationModal.js';

export const createCountryPopulationQuizModal = () => {
  const countryQuizPopulation = new CountryPopulationQuiz();
  return new QuizPopulationModal(countryQuizPopulation);
};
