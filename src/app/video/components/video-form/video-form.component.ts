import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Author, Category, Video } from '../../models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() submitForm: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() public video: Video;
  public videoForm: FormGroup;
  public authors$: Observable<Author[]>;
  public categories$: Observable<Category[]>;
  public categories: Category[] = [];
  public categoryFormControls: FormControl[] = [];
  private video$: Subject<Video> = new Subject<Video>();
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
    this.authors$ = this.store.select((state) => state.author.items);
    this.categories$ = this.store.select((state) => state.category.items);
  }

  ngOnInit() {
    this.initVideoForm();
    combineLatest(this.categories$, this.video$).pipe(
      filter(([categories]) => categories.length > 0),
      takeUntil(this.unsubscribe$),
    ).subscribe(([categories]) => {
      this.categories = categories;
      this.initVideoForm();
    });
  }

  private initVideoForm() {
    this.videoForm = this.formBuilder.group(this.controlsConfig);
  }

  public handleSubmit() {
    this.submitForm.emit(
      this.prepareDataToSubmit()
    );
  }

  public handleCancelClick($event) {
    $event.preventDefault();
    this.cancel.emit();
  }

  private prepareDataToSubmit(): Video {
    const { name, authorId } = this.videoForm.value;
    const { id, formats, releaseDate } = this.video;
    const catIds = this.videoForm.value.categories.map(
      (checked, i) => checked ? this.categories[i].id : null
    ).filter(Boolean);

    return  {
      id,
      name,
      authorId,
      formats,
      releaseDate,
      catIds
    };
  }

  private get categoryFormsArray() {
    return this.videoForm.controls.categories as FormArray;
  }

  private get controlsConfig(): any {
    if (this.video) {
      this.categoryFormControls = this.categories.map((category) => {
        return new FormControl(
          this.video.catIds.includes(category.id)
        );
      });
    }
    return {
      name: [this.video ? this.video.name : '', Validators.required],
      authorId: [this.video ? this.video.authorId : null],
      categories: new FormArray(this.video ? this.categoryFormControls : []),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.video$.next(changes.video.currentValue);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
