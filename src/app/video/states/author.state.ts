import { Author } from '../models';

export interface AuthorState  {
  items: Author[];
}

export const initialAuthorState: AuthorState = {
  items: []
};
