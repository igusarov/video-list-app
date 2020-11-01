import { AppState } from '../../app.state';
import { Author, Category, Video } from '../models';
import { createSelector } from '@ngrx/store';

export const getVideos = (state: AppState): Video[] => state.video.items;
export const getAuthors = (state: AppState): Author[] => state.author.items;
export const getCategories = (state: AppState): Category[] => state.author.items;

export const getVideoById = (id: number) => createSelector<AppState, Video[], Video>(
  getVideos,
  (videos) => videos.find((video) => video.id === id),
);
