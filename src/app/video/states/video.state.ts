import { Author, Category, Video } from '../models';

export interface VideoState  {
  categories: Category[];
  authors: Author[];
  videos: Video[];
}

export const initialVideoState: VideoState = {
  categories: [],
  authors: [],
  videos: []
};


