import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthorsService } from '../services/author.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as videoActions from '../actions/video.action';
import * as getDataActions from '../actions/get-data.action';
import { filter, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';
import { omit } from 'lodash/fp';
import { Video, VideoBasic } from '../models';
import { getVideos } from '../selectors';

const editVideoAuthorHasChanged = ([action, videos]: [videoActions.EditVideo, Video[]]) => {
  const editedVideo = action.payload;
  const originalVideo = videos.find((video) => video.id === editedVideo.id);
  return editedVideo.authorId !== originalVideo.authorId;
};

@Injectable()
export class VideoEffect {
  constructor(
    private store: Store<AppState>,
    private authorsService: AuthorsService,
    private actions: Actions,
  ) {}

  @Effect() public editVideoAuthorChanged = this.actions.pipe(
    ofType<videoActions.EditVideo>(videoActions.EDIT_VIDEO),
    withLatestFrom(this.store.select(getVideos)),
    filter(editVideoAuthorHasChanged),
    switchMap(([action, videos]) => {
      const editedVideo = action.payload;
      const originalVideo = videos.find((video) => video.id === editedVideo.id);
      const prevAuthorVideosToSave = videos
          .filter((video) => {
            return video.authorId === originalVideo.authorId &&
              video.id !== editedVideo.id;
          }).map(omit('authorId')) as VideoBasic[];
      const newAuthorVideosToSave = videos
          .filter((video) => video.authorId === editedVideo.authorId)
          .concat(editedVideo)
          .map(omit('authorId')) as VideoBasic[];
      return this.authorsService.patchAuthor(
        originalVideo.authorId,
        {videos: prevAuthorVideosToSave}
        ).pipe(
          switchMap(() => {
            return this.authorsService.patchAuthor(
              editedVideo.authorId,
              {videos: newAuthorVideosToSave}
              );
          } )
        );
    }),
    mapTo(new videoActions.EditVideoSuccess()),
  );

  @Effect() public editVideoAuthorNotChanged = this.actions.pipe(
    ofType<videoActions.EditVideo>(videoActions.EDIT_VIDEO),
    withLatestFrom(this.store.select(getVideos)),
    filter((data) => !editVideoAuthorHasChanged(data)),
    switchMap(([action, videos]) => {
      const editedVideo = action.payload;
      const videosToSave = videos
        .filter((video) => video.authorId === editedVideo.authorId)
        .map((video) => video.id === editedVideo.id ? editedVideo : video)
        .map(omit('authorId')) as VideoBasic[];
      return this.authorsService.patchAuthor(editedVideo.authorId, {videos: videosToSave});
    }),
    mapTo(new videoActions.EditVideoSuccess())
  );

  @Effect() public addVideo = this.actions.pipe(
    ofType<videoActions.AddVideo>(videoActions.ADD_VIDEO),
    withLatestFrom(this.store.select(getVideos)),
    switchMap(([action, videos]) => {
      const maxId = videos.reduce((acc, video) => Math.max(acc, video.id), 0);
      const newVideo = {
        ...action.payload,
        id: maxId + 1,
        formats: {
          one: { res: '1080p', size: 1000 }
        }
      };
      const videosToSave = videos
        .filter((video) => video.authorId === newVideo.authorId)
        .concat(newVideo)
        .map(omit('authorId')) as VideoBasic[];
      return this.authorsService.patchAuthor(newVideo.authorId, {videos: videosToSave});
    }),
    mapTo(new videoActions.AddVideoSuccess())
  );

  @Effect() public deleteVideo = this.actions.pipe(
    ofType<videoActions.DeleteVideo>(videoActions.DELETE_VIDEO),
    withLatestFrom(this.store.select(getVideos)),
    switchMap(([action, videos]) => {
      const videoToRemove = videos.find((video) => video.id === action.payload.videoId);
      const videosToSave = videos.filter((video) => {
        return video.authorId === videoToRemove.authorId &&
          video.id !== videoToRemove.id;
      });
      return this.authorsService.patchAuthor(videoToRemove.authorId, {videos: videosToSave});
    }),
    mapTo(new getDataActions.GetData()),
  );
}
