import { CountryQuiz } from './CountryQuiz.js';
import { QuizModal } from './QuizModal.js';

// Factory pattern
export const createCountryQuizModal = () => {
  const countryQuiz = new CountryQuiz();
  return new QuizModal(countryQuiz);
};
