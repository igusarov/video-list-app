import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../models';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { GetData } from '../../actions/get-data.action';
import { EditVideo } from '../../actions/video.action';
import { getVideoById } from '../../selectors';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoEditComponent {

  public video$: Observable<Video>;
  public isSubmitting$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.store.dispatch(new GetData());
    this.video$ = this.store.select(getVideoById(
      parseInt(this.route.snapshot.params.id, 10)
    ));
    this.isSubmitting$ = this.store.select(
      (state) => state.video.isSubmitting,
    );
  }

  public handleSubmit(video: Video) {
    this.store.dispatch(new EditVideo(video));
  }

  public handleCancel() {
    this.router.navigate(['video/list']);
  }
}
