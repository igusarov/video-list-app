import { Action } from '@ngrx/store';
import { Category } from '../models';

export const GET_CATEGORIES_SUCCESS = 'CATEGORY/GET_CATEGORIES_SUCCESS';

export class GetCategoriesSuccess implements Action {
  public readonly type = GET_CATEGORIES_SUCCESS;

  constructor(public payload: Category[]) {}
}


export type Actions = GetCategoriesSuccess;
