import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { AppState } from './app.state';
import { videoReducer } from './video/reducers/video.reducer';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../environments/environment';
import { authorReducer } from './video/reducers/author.reducer';
import { categoryReducer } from './video/reducers/category.reducer';

function logger(reducer: ActionReducer<AppState>) {
  return storeLogger()(reducer);
}

export const reducers: ActionReducerMap<AppState> = {
  video: videoReducer,
  author: authorReducer,
  category: categoryReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [ logger ];


