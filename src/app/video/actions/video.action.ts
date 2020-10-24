import { Action } from '@ngrx/store';
import { Video } from '../models';

export const GET_VIDEOS_SUCCESS = 'VIDEO/GET_VIDEOS_SUCCESS';

export class GetVideosSuccess implements Action {
  public readonly type = GET_VIDEOS_SUCCESS;

  constructor(public payload: Video[]) {}
}


export type Actions = GetVideosSuccess;
