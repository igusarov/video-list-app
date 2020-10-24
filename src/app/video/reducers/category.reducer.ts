import * as categoryActions from '../actions/category.action';
import { initialCategoryState, CategoryState } from '../states/category.state';
import { GET_CATEGORIES_SUCCESS } from '../actions/category.action';

export function categoryReducer(
  state = initialCategoryState,
  action: categoryActions.Actions
): CategoryState {
  if (action.type === GET_CATEGORIES_SUCCESS) {
    return {
      ...state,
      items: action.payload
    };
  } else {
    return state;
  }
}
