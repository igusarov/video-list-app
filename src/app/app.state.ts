import { VideoState } from './video/states/video.state';
import { AuthorState } from './video/states/author.state';
import { CategoryState } from './video/states/category.state';

export interface AppState {
  video: VideoState;
  author: AuthorState;
  category: CategoryState;
}
