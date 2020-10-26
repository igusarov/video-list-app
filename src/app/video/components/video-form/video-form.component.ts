import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Author, Category, Video } from '../../models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { filter, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() submitForm: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() public video: Video;
  public videoForm: FormGroup;
  public authors$: Observable<Author[]>;
  public categories$: Observable<Category[]>;
  public categories: Category[] = [];
  public categoryFormControls: FormControl[] = [];
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
    this.authors$ = this.store.select((state) => state.author.items);
    this.categories$ = this.store.select((state) => state.category.items);
  }
  ngOnInit() {
    this.videoForm = this.formBuilder.group(this.controlsConfig);
    this.categories$.pipe(
      filter((categories) => categories.length > 0),
      take(1),
      takeUntil(this.unsubscribe$),
    ).subscribe((categories) => {
      this.categories = categories;
    });
  }

  public handleSubmit() {
    this.submitForm.emit(
      this.prepareDataToSubmit()
    );
  }

  public handleCancelClick($event) {
    $event.preventDefault();
    this.onCancel.emit();
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
    this.categoryFormControls = this.categories.map((category) => {
      return new FormControl(
        this.video.catIds.includes(category.id)
      );
    });

    if (this.video) {
      return {
        name: [this.video.name, Validators.required],
        authorId: [this.video.authorId],
        categories: new FormArray(this.categoryFormControls),
      };
    } else {
      return {
        name: ['', Validators.required],
        authorId: [null],
        categories: new FormArray([]),
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video.currentValue) {
      this.videoForm = this.formBuilder.group(this.controlsConfig);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
