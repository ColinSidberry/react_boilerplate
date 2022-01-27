/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_USERNAME, CHANGE_INPUT } from './constants';

// Step 3a: update initial state
// The initial state of the App
export const initialState = {
  username: '',
  input: '',
};

// Question: Is produce used here because its is a safer way to change the state
// without changing the original state?
/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '');
        break;
      // Step 3b: update reducer
      case CHANGE_INPUT:
        draft.input = action.input;
        break;
    }
  });

export default homeReducer;
