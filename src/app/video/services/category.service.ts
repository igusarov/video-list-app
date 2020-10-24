import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoriesResourceEndpoint } from '../../constants';
import { CategoriesResourceResponse } from '../models/categories-resource';

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient,
  ) {}

  getCategories(): Observable<CategoriesResourceResponse> {
    return this.http.get<CategoriesResourceResponse>(categoriesResourceEndpoint);
  }
}
