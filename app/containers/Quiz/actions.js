/*
 *
 * actions
 *
 */

import {
  FETCH_QUIZ_QUESTIONS,
  SET_QUIZ_QUESTIONS,
  MOVE_TO_NEXT_QUESTION,
  SET_ANSWER_STATUS,
  SET_QUIZ_RESULTS,
  COMPUTE_RESULTS,
  RESET_QUIZ,
  RESET_ALL,
} from './constants';

export function fetchQuizQuestions(difficultyLevel) {
  return {
    type: FETCH_QUIZ_QUESTIONS,
    payload: difficultyLevel,
  };
}

export function setQuizQuestions(questions) {
  return {
    type: SET_QUIZ_QUESTIONS,
    payload: questions,
  };
}

export function setAnswerStatus(questionNo, isCorrectlyAnswered) {
  return {
    type: SET_ANSWER_STATUS,
    payload: { questionNo, isCorrectlyAnswered },
  };
}

export function moveToNextQuestion() {
  return {
    type: MOVE_TO_NEXT_QUESTION,
  };
}

export function computeResults() {
  return {
    type: COMPUTE_RESULTS,
  };
}
export function setQuizResults(payload) {
  return {
    type: SET_QUIZ_RESULTS,
    payload,
  };
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ,
  };
}

export function resetAll() {
  return {
    type: RESET_ALL,
  };
}
