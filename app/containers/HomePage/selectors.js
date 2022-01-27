/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectInput = () =>
  createSelector(
    selectHome,
    homeState => homeState.input,
  );
export { selectHome, makeSelectUsername, makeSelectInput };
