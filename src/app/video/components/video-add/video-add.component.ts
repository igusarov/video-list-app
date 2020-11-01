import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Video } from '../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { GetData } from '../../actions/get-data.action';
import { AddVideo } from '../../actions/video.action';
import { filter, take } from 'rxjs/operators';
import { getAuthors } from '../../selectors';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoAddComponent {
  public isSubmitting$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.isFetchDataNeeded) {
      this.store.dispatch(new GetData());
    }
    this.isSubmitting$ = this.store.select(
      (state) => state.video.isSubmitting,
    );
  }

  public handleSubmit(video: Video) {
    this.store.dispatch(new AddVideo(video));
    this.isSubmitting$.pipe(
      filter((isSubmitting) => !isSubmitting),
      take(1),
    ).subscribe(() => {
      this.goToVideoList();
    });
  }

  public handleCancel() {
    this.goToVideoList();
  }

  private goToVideoList() {
    this.router.navigate(['video/list']);
  }

  private get isFetchDataNeeded(): boolean {
    let isNeeded = false;
    this.store.select(getAuthors).pipe(
      take(1)
    ).subscribe((authors: Author[]) => {
      isNeeded = authors.length === 0;
    });
    return isNeeded;
  }

}
