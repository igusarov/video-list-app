import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { GetData } from '../../actions/get-data.action';
import { getTableRows, TableRow } from './video-list.selectors';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeleteVideo } from '../../actions/video.action';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent implements OnInit,  AfterViewInit {
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
      this.searchInput.valueChanges
    ).pipe(
      map(([rows, searchQuery]: [TableRow[], string]) => {
        const text = searchQuery.trim().toLowerCase();
        if (!text) {
          return rows;
        }
        return rows.filter(({videoName, authorName, categoryName, highestQualityFormat, releaseDate}) => {
          return (videoName + authorName + categoryName + highestQualityFormat + releaseDate)
            .toLowerCase().includes(text);
        });
      }),
    );
  }

  ngOnInit() {
    this.store.dispatch(new GetData());
  }

  ngAfterViewInit(): void {
    this.searchInput.setValue('');
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
