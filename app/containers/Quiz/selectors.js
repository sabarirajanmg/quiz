import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Difficulty Level state
 */
const selectQuiz = state => state.quiz || initialState;

const makeSelectQuestions = () =>
  createSelector(
    selectQuiz,
    state => state.questions,
  );

const makeSelectCurrentQuestion = () =>
  createSelector(
    selectQuiz,
    state => state.currentQuestion,
  );

const makeSelectResult = () =>
  createSelector(
    selectQuiz,
    state => state.result,
  );

export { makeSelectQuestions, makeSelectCurrentQuestion, makeSelectResult };
