import { Action } from '@ngrx/store';
import { Video } from '../models';

export const GET_VIDEOS_SUCCESS = 'VIDEO/GET_VIDEOS_SUCCESS';
export const EDIT_VIDEO = 'VIDEO/EDIT_VIDEO';
export const EDIT_VIDEO_SUCCESS = 'VIDEO/EDIT_VIDEO_SUCCESS';
export const EDIT_VIDEO_ERROR = 'VIDEO/EDIT_VIDEO_ERROR';
export const ADD_VIDEO = 'VIDEO/ADD_VIDEO';
export const ADD_VIDEO_SUCCESS = 'VIDEO/ADD_VIDEO_SUCCESS';
export const ADD_VIDEO_ERROR = 'VIDEO/ADD_VIDEO_ERROR';
export const DELETE_VIDEO = 'VIDEO/DELETE_VIDEO';

export class GetVideosSuccess implements Action {
  public readonly type = GET_VIDEOS_SUCCESS;
  constructor(public payload: Video[]) {}
}

export class EditVideo implements Action {
  public readonly type = EDIT_VIDEO;
  constructor(public payload: Video) {}
}

export class EditVideoSuccess implements Action {
  public readonly type = EDIT_VIDEO_SUCCESS;
}

export class EditVideoError implements Action {
  public readonly type = EDIT_VIDEO_ERROR;
}

export class AddVideo implements Action {
  public readonly type = ADD_VIDEO;
  constructor(public payload: Video) {}
}

export class AddVideoSuccess implements Action {
  public readonly type = ADD_VIDEO_SUCCESS;
}

export class AddVideoError implements Action {
  public readonly type = ADD_VIDEO_ERROR;
}

export class DeleteVideo implements Action {
  public readonly type = DELETE_VIDEO;
  constructor(public payload: {
    videoId: number
  }) {}
}


export type Actions = GetVideosSuccess |
  EditVideo |
  EditVideoSuccess |
  EditVideoError |
  AddVideo |
  AddVideoSuccess|
  AddVideoError |
  DeleteVideo;
