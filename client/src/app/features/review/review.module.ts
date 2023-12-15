import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './components/review-list.component';
import { ReviewEditComponent } from './components/review-edit.component';
import { NewReviewComponent } from './components/new-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ReviewEditComponent,
    NewReviewComponent,
    ReviewListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ReviewListComponent},
      { path: 'new', component: NewReviewComponent},
      { path: ':review_id', component: ReviewEditComponent},
      { path: '**', redirectTo: 'list'},
    ])
  ]
})
export class ReviewModule { }
