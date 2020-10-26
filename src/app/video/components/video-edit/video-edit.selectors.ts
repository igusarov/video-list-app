import { AppState } from '../../../app.state';
import { createSelector } from '@ngrx/store';
import { Video } from '../../models';

export const getVideoById = (id: number) => createSelector<AppState, Video[], Video>(
  (state) => state.video.items,
  (videos) => videos.find((video) => video.id === id),
);
