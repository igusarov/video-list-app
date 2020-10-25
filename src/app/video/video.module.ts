import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './components/video-list/video-list.component';
import { EffectsModule } from '@ngrx/effects';
import { GetDataEffect } from './effects/get-data.effect';
import { AuthorsService } from './services/author.service';
import { CategoryService } from './services/category.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    VideoListComponent
  ],
  exports: [
    VideoListComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      GetDataEffect,
    ]),
    MatTableModule,
    MatButtonModule
  ],
  providers: [
    AuthorsService,
    CategoryService
  ]
})
export class VideoModule { }
