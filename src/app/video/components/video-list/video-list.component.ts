import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { GetData } from '../../actions/get-data.action';
import { getTableRows } from './video-list.selectors';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeleteVideo } from '../../actions/video.action';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TableRow } from '../../models';

const filterTableRowsByText = ([rows, searchQuery]: [TableRow[], string]) => {
  const text = searchQuery.trim().toLowerCase();
  if (!text) {
    return rows;
  }
  return rows.filter(({videoName, authorName, categoryName, highestQualityFormat, releaseDate}) => {
    return (videoName + authorName + categoryName + highestQualityFormat + releaseDate)
      .toLowerCase().includes(text);
  });
};

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {
  public searchInput: FormControl = new FormControl('');

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
    this.rows$ = combineLatest(
      this.store.select(getTableRows),
      this.searchInput.valueChanges.pipe(
        startWith(''),
      )
    ).pipe(map(filterTableRowsByText));

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
}
