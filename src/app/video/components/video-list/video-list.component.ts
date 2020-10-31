import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { GetData } from '../../actions/get-data.action';
import { getTableRows, TableRow } from './video-list.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { DeleteVideo } from '../../actions/video.action';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  public displayedColumns: string[] = [
    'videoName',
    'authorName',
    'categoryName',
    'highestQualityFormat',
    'releaseDate',
    'options'
  ];

  public rows$: Observable<TableRow[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    this.rows$ = this.store.select(getTableRows);
  }

  ngOnInit() {
    this.store.dispatch(new GetData());
  }

  public handleEditButtonClick(row: TableRow) {
    this.router.navigate(['video', row.id, 'edit']);
  }

  public handleDeleteButtonClick(row: TableRow) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((deletionIsConfirmed) => {
      if (deletionIsConfirmed) {
        this.store.dispatch(new DeleteVideo({videoId: row.id}));
      }
    });
  }

  public handleAddVideo() {
    this.router.navigate(['video/add']);
  }

}
