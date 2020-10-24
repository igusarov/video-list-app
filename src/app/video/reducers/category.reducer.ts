import * as categoryActions from '../actions/category.action';
import { GET_CATEGORIES_SUCCESS } from '../actions/category.action';
import * as getDataActions from '../actions/get-data.action';
import { GET_DATA } from '../actions/get-data.action';
import { CategoryState, initialCategoryState } from '../states/category.state';

export function categoryReducer(
  state = initialCategoryState,
  action: categoryActions.Actions | getDataActions.Actions
): CategoryState {
  if (action.type === GET_CATEGORIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      items: action.payload
    };
  } else if (action.type === GET_DATA) {
    return {
      ...state,
      isLoading: true
    };
  } {
    return state;
  }
}
