/* eslint-disable consistent-return */
/*
 *
 * difficultyLevelReducer
 *
 */
import produce from 'immer';

import { SET_DIFFICULTY, RESET_DIFFICULTY } from './constants';

export const initialState = {
  difficultyLevel: 'easy',
  difficultyLevels: ['easy', 'medium', 'hard'],
};

/* eslint-disable default-case, no-param-reassign */
const difficultyLevelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_DIFFICULTY:
        draft.difficultyLevel = action.payload;
        break;
      case RESET_DIFFICULTY:
        return initialState;
    }
  });

export default difficultyLevelReducer;
