import { Action } from '@ngrx/store';

export const GET_DATA = 'GET-DATA';

export class GetData implements Action {
  public readonly type = GET_DATA;
}


export type Actions = GetData;
