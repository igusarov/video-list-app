import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../models';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { getVideoById } from './video-edit.selectors';
import { ActivatedRoute } from '@angular/router';
import { GetData } from '../../actions/get-data.action';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent {

  public video$: Observable<Video>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.store.dispatch(new GetData());

    this.video$ = this.store.select(getVideoById(
      parseInt(this.route.snapshot.params.id, 10)
    ));
  }

  public handleSubmit(video: Video) {
    console.log(video);
  }

  public handleCancel() {
    console.log('cancel');
  }
}
