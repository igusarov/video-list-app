import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthorsService } from '../services/author.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as videoActions from '../actions/video.action';
import { tap, withLatestFrom } from 'rxjs/operators';
import { omit } from 'lodash/fp';
import { VideoBasic } from '../models';

@Injectable()
export class VideoEffect {
  constructor(
    private store: Store<AppState>,
    private authorsService: AuthorsService,
    private actions: Actions,
  ) {}

  @Effect({
    dispatch: false
  }) public editVideo = this.actions.pipe(
    ofType<videoActions.EditVideo>(videoActions.EDIT_VIDEO),
    withLatestFrom(this.store.select((state) => state.video.items)),
    tap(([action, videos]) => {
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
        this.authorsService
          .patchAuthorVideos(originalVideo.authorId, prevAuthorVideosToSave)
          .subscribe(() => {
            this.authorsService.patchAuthorVideos(editedVideo.authorId, newAuthorVideosToSave).subscribe();
          });
      } else {
        const videosToSave = videos
          .filter((video) => video.authorId === editedVideo.authorId)
          .map((video) => {
          if (video.id === editedVideo.id) {
           return omit('authorId')(editedVideo);
          }
          return video;
        });
        this.authorsService.patchAuthorVideos(editedVideo.authorId, videosToSave).subscribe();
      }
    })
  );
}
