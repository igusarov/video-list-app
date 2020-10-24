import * as authorActions from '../actions/author.action';
import { GET_AUTHORS_SUCCESS } from '../actions/author.action';
import * as getDataActions from '../actions/get-data.action';
import { GET_DATA } from '../actions/get-data.action';
import { AuthorState, initialAuthorState } from '../states/author.state';

export function authorReducer(
  state = initialAuthorState,
  action: authorActions.Actions | getDataActions.GetData
): AuthorState {
  if (action.type === GET_AUTHORS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      items: action.payload
    };
  } else if (action.type === GET_DATA) {
    return {
      ...state,
      isLoading: true,
    };
  } {
    return state;
  }
}
