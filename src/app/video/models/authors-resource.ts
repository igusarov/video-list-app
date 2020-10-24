import { Author, Format, VideoBasic } from './index';

export interface AuthorsResourceVideo extends VideoBasic {
  formats: {[key: string]: Format};
}

export interface AuthorsResourceAuthor extends Author {
  videos: AuthorsResourceVideo[];
}

export type AuthorsResourceResponse = AuthorsResourceAuthor[];
