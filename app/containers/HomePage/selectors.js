import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Difficulty Level state
 */
const selectHome = state => state.home || initialState;

const makeSelectDifficultyLevel = () =>
  createSelector(
    selectHome,
    state => state.difficultyLevel,
  );

const makeSelectDifficultyLevels = () =>
  createSelector(
    selectHome,
    state => state.difficultyLevels,
  );
export {
  selectHome as selectDifficultyLevel,
  makeSelectDifficultyLevel,
  makeSelectDifficultyLevels,
};
