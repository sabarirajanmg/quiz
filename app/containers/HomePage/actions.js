/*
 *
 * LanguageProvider actions
 *
 */

import { SET_DIFFICULTY, RESET_DIFFICULTY } from './constants';

export function changeDifficultyLevel(difficultyLevel) {
  return {
    type: SET_DIFFICULTY,
    payload: difficultyLevel,
  };
}

export function resetDifficulty() {
  return {
    type: RESET_DIFFICULTY,
  };
}
