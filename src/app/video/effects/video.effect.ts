import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthorsService } from '../services/author.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as videoActions from '../actions/video.action';
import { mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { omit } from 'lodash/fp';
import { VideoBasic } from '../models';

@Injectable()
export class VideoEffect {
  constructor(
    private store: Store<AppState>,
    private authorsService: AuthorsService,
    private actions: Actions,
  ) {}

  @Effect() public editVideo = this.actions.pipe(
    ofType<videoActions.EditVideo>(videoActions.EDIT_VIDEO),
    withLatestFrom(this.store.select((state) => state.video.items)),
    switchMap(([action, videos]) => {
      const editedVideo = action.payload;
      const originalVideo = videos.find((video) => video.id === editedVideo.id);
      if (originalVideo.authorId !== editedVideo.authorId) {
        const prevAuthorVideosToSave = videos
          .filter((video) => {
            return video.authorId === originalVideo.authorId &&
              video.id !== editedVideo.id;
          }).map(omit('authorId')) as VideoBasic[];
        const newAuthorVideosToSave = videos
          .filter((video) => video.authorId === editedVideo.authorId)
          .concat(editedVideo)
          .map(omit('authorId')) as VideoBasic[];
        return this.authorsService.patchAuthorVideos(originalVideo.authorId, prevAuthorVideosToSave).pipe(
          switchMap(() => {
            return this.authorsService.patchAuthorVideos(editedVideo.authorId, newAuthorVideosToSave).pipe(
              mapTo(new videoActions.EditVideoSuccess()),
            );
          } )
        );
      } else {
        const videosToSave = videos
          .filter((video) => video.authorId === editedVideo.authorId)
          .map((video) => {
          if (video.id === editedVideo.id) {
           return omit('authorId')(editedVideo);
          }
          return video;
        });
        return this.authorsService.patchAuthorVideos(editedVideo.authorId, videosToSave).pipe(
          mapTo(new videoActions.EditVideoSuccess())
        );
      }
    })
  );

  @Effect() public addVideo = this.actions.pipe(
    ofType<videoActions.AddVideo>(videoActions.ADD_VIDEO),
    withLatestFrom(this.store.select((state) => state.video.items)),
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
      return this.authorsService.patchAuthorVideos(newVideo.authorId, videosToSave);
    }),
    mapTo(new videoActions.AddVideoSuccess())
  );
}
