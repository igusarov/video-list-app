import { Author, VideoBasic } from './index';


export interface AuthorsResourceAuthor extends Author {
  videos: VideoBasic[];
}

export type AuthorsResourceResponse = AuthorsResourceAuthor[];
