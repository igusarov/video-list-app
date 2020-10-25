import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { GetData } from '../../actions/get-data.action';
import { getTableRows, TableRow } from './video-list.selectors';
import { Observable } from 'rxjs';

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

  public rows$ = new Observable<TableRow[]>();


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetData());
    this.rows$ = this.store.select(getTableRows);
  }

  public handleEditButtonClick(row: TableRow) {
    console.log('edit', row);
  }

  public handleDeleteButtonClick(row: TableRow) {
    console.log('delete', row);
  }

}
