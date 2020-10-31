import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './components/video-list/video-list.component';
import { EffectsModule } from '@ngrx/effects';
import { GetDataEffect } from './effects/get-data.effect';
import { AuthorsService } from './services/author.service';
import { CategoryService } from './services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoAddComponent } from './components/video-add/video-add.component';
import { VideoFormComponent } from './components/video-form/video-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoEffect } from './effects/video.effect';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    VideoListComponent,
    VideoEditComponent,
    VideoAddComponent,
    VideoFormComponent,
    ConfirmDialogComponent
  ],
  exports: [
    VideoListComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetDataEffect,
      VideoEffect,
    ]),
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
  ],
  providers: [
    AuthorsService,
    CategoryService
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class VideoModule { }
