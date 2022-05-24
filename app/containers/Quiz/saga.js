/* eslint-disable no-param-reassign */
import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { fetchQuestions } from 'utils/ApiService';
import { makeSelectDifficultyLevel } from 'containers/HomePage/selectors';
import { v4 as uuid } from 'uuid';
import { resetDifficulty } from 'containers/HomePage/actions';
import { push } from 'connected-react-router';

import { FETCH_QUIZ_QUESTIONS, COMPUTE_RESULTS, RESET_ALL } from './constants';
import { setQuizQuestions, setQuizResults, resetQuiz } from './actions';
import { makeSelectQuestions } from './selectors';

function* fetchQuiz() {
  const difficultyLevel = yield select(makeSelectDifficultyLevel());

  const response = yield call(fetchQuestions, difficultyLevel);
  const results = (response && response.data && response.data.results) || [];

  results.forEach((question, index) => {
    question.id = index;
    // set all answers consolidated and randomly sorted
    const answers = [
      question.correct_answer,
      ...question.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
    question.answers = answers.map(answer => ({ id: uuid(), value: answer }));
  });
  yield put(setQuizQuestions(results));
}

function* computeResults() {
  const questions = yield select(makeSelectQuestions());
  const result = questions.reduce(
    (correctlyAnsered, question) =>
      question.isCorrectlyAnswered ? correctlyAnsered + 1 : correctlyAnsered,
    0,
  );
  yield put(setQuizResults(result));
}

function* resetAll() {
  yield all([put(resetDifficulty()), put(resetQuiz())]);

  yield put(push('/'));
}

export default function* quizSaga() {
  yield takeLatest(FETCH_QUIZ_QUESTIONS, fetchQuiz);
  yield takeLatest(COMPUTE_RESULTS, computeResults);
  yield takeLatest(RESET_ALL, resetAll);
}
