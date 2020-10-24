import { Category } from '../models';

export interface CategoryState  {
  items: Category[];
}

export const initialCategoryState: CategoryState = {
  items: []
};
