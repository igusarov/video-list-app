import { Author } from '../models';

export interface AuthorState  {
  isLoading: boolean;
  items: Author[];
}

export const initialAuthorState: AuthorState = {
  isLoading: false,
  items: []
};
