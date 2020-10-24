import * as authorActions from '../actions/author.action';
import { GET_AUTHORS_SUCCESS } from '../actions/author.action';
import { AuthorState, initialAuthorState } from '../states/author.state';

export function authorReducer(
  state = initialAuthorState,
  action: authorActions.Actions
): AuthorState {
  if (action.type === GET_AUTHORS_SUCCESS) {
    return {
      ...state,
      items: action.payload
    };
  } else {
    return state;
  }
}
