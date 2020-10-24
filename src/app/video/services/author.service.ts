import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorsResourceResponse } from '../models/authors-resource';
import { authorsResourceEndpoint } from '../../constants';

@Injectable()
export class AuthorsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAuthors(): Observable<AuthorsResourceResponse> {
    return this.http.get<AuthorsResourceResponse>(authorsResourceEndpoint);
  }
}
