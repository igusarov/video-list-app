import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoListComponent } from './video/components/video-list/video-list.component';
import { VideoEditComponent } from './video/components/video-edit/video-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/video-list', pathMatch: 'full' },
  { path: 'video-list', component: VideoListComponent },
  { path: 'video-list/:id', component: VideoEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
