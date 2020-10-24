import { Category } from '../models';

export interface CategoryState  {
  isLoading: boolean;
  items: Category[];
}

export const initialCategoryState: CategoryState = {
  isLoading: false,
  items: []
};
