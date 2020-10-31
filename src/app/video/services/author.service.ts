import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorsResourceResponse } from '../models/authors-resource';
import { authorsResourceEndpoint } from '../../constants';
import { VideoBasic } from '../models';

@Injectable()
export class AuthorsService {
  constructor(
    private http: HttpClient,
  ) {}

  getAuthors(): Observable<AuthorsResourceResponse> {
    return this.http.get<AuthorsResourceResponse>(authorsResourceEndpoint);
  }

  patchAuthorVideos(authorId, payload: VideoBasic[]): Observable<void> {
    return this.http.patch<void>(`${authorsResourceEndpoint}/${authorId}`, {videos: payload});
  }
}
