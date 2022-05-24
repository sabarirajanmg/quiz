/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/*
 *
 * difficultyLevelReducer
 *
 */
import produce from 'immer';

import {
  SET_QUIZ_QUESTIONS,
  MOVE_TO_NEXT_QUESTION,
  SET_QUIZ_RESULTS,
  SET_ANSWER_STATUS,
  RESET_QUIZ,
} from './constants';

export const initialState = {
  questions: [],
  currentQuestion: 1,
  result: null,
};

/* eslint-disable default-case, no-param-reassign */
const quizReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case SET_QUIZ_QUESTIONS:
        draft.questions = payload;
        break;
      case MOVE_TO_NEXT_QUESTION:
        draft.currentQuestion = state.currentQuestion + 1;
        break;
      case SET_QUIZ_RESULTS:
        draft.result = payload;
        break;
      case SET_ANSWER_STATUS:
        const index = draft.questions.findIndex(
          ques => ques.id === payload.questionNo,
        );
        if (index !== -1)
          draft.questions[index].isCorrectlyAnswered =
            payload.isCorrectlyAnswered;
        break;
      case RESET_QUIZ:
        return initialState;
    }
  });

export default quizReducer;
