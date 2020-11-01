import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as getDataActions from '../actions/get-data.action';
import * as categoryActions from '../actions/category.action';
import * as videoActions from '../actions/video.action';
import * as authorActions from '../actions/author.action';
import { switchMap } from 'rxjs/operators';
import { AuthorsService } from '../services/author.service';
import { AuthorsResourceAuthor, AuthorsResourceResponse } from '../models/authors-resource';
import { forkJoin } from 'rxjs';
import { CategoriesResourceResponse } from '../models/categories-resource';
import { CategoryService } from '../services/category.service';
import { Author, Video } from '../models';
import { omit } from 'lodash/fp';

const getVideosFromResponse = (response: AuthorsResourceResponse): Video[] => {
  return response.reduce<Video[]>((acc: Video[], item: AuthorsResourceAuthor) => {
    const videos = item.videos.map((video) => ({
      ...video,
      authorId: item.id,
    }));
    return [
      ...acc,
      ...videos
    ];
  }, []);
};

const getAuthorsFromResponse = (response: AuthorsResourceResponse): Author[] => {
  return response.map(omit('videos'));
};

@Injectable()
export class GetDataEffect {
  constructor(
    private authorService: AuthorsService,
    private categoryService: CategoryService,
    private actions: Actions,
  ) {
  }

  @Effect() public getData = this.actions.pipe(
    ofType<getDataActions.GetData>(getDataActions.GET_DATA),
    switchMap(() => {
      return forkJoin<AuthorsResourceResponse, CategoriesResourceResponse>(
        this.authorService.getAuthors(),
        this.categoryService.getCategories(),
      );
    }),
    switchMap(([authorsResponse, categoriesResponse]) => {
      return [
        new authorActions.GetAuthorsSuccess(
          getAuthorsFromResponse(authorsResponse),
        ),
        new videoActions.GetVideosSuccess(
          getVideosFromResponse(authorsResponse),
        ),
        new categoryActions.GetCategoriesSuccess(categoriesResponse)
      ];
    })
  );
}
