import { Action } from '@ngrx/store';
import { Author } from '../models';

export const GET_AUTHORS_SUCCESS = 'AUTHOR/GET_AUTHORS_SUCCESS';

export class GetAuthorsSuccess implements Action {
  public readonly type = GET_AUTHORS_SUCCESS;

  constructor(public payload: Author[]) {}
}


export type Actions = GetAuthorsSuccess;
