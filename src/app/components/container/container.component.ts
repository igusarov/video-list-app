import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  isAddButtonShown$: Observable<boolean>;

  constructor(
    private router: Router,
  ) {
    this.isAddButtonShown$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd): boolean => event.url !== '/video/add')
    );
  }

  public handleAddVideo() {
    this.router.navigate(['video/add']);
  }
}
