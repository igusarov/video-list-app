import { Action } from '@ngrx/store';
import { Video } from '../models';

export const GET_VIDEOS_SUCCESS = 'VIDEO/GET_VIDEOS_SUCCESS';
export const EDIT_VIDEO = 'VIDEO/EDIT_VIDEO';

export class GetVideosSuccess implements Action {
  public readonly type = GET_VIDEOS_SUCCESS;
  constructor(public payload: Video[]) {}
}

export class EditVideo implements Action {
  public readonly type = EDIT_VIDEO;
  constructor(public payload: Video) {}
}


export type Actions = GetVideosSuccess;
