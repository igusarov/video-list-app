import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Author, Category, Video } from '../../models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { getAuthors, getCategories } from '../../selectors';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() submitForm: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() isLoading: boolean;
  @Input() public video: Video;
  public videoForm: FormGroup;
  public authors$: Observable<Author[]>;
  public categories$: Observable<Category[]>;
  public categories: Category[] = [];
  private video$: Subject<Video> = new Subject<Video>();
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
    this.authors$ = this.store.select(getAuthors);
    this.categories$ = this.store.select(getCategories);
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
    this.video$.next(null);
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

  public get isButtonDisabled() {
    return !this.videoForm.valid || this.isLoading;
  }

  private initVideoForm() {
    this.videoForm = this.formBuilder.group(this.controlsConfig);
  }

  private prepareDataToSubmit(): Video {
    const { name, authorId } = this.videoForm.value;
    const { id, formats, releaseDate } = this.video || { id: null, formats: null, releaseDate: null};
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
    return {
      name: [this.video ? this.video.name : '', Validators.required],
      authorId: [this.video ? this.video.authorId : null, Validators.required],
      categories: new FormArray(this.categoryFormControls),
    };
  }

  private get categoryFormControls(): FormControl[] {
    return this.categories.map((category) => {
      return new FormControl(
        this.video ? this.video.catIds.includes(category.id) : false,
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video) {
      this.video$.next(changes.video.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
