import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-edit',
  template: `
    <section class="dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit review
        </h2>
        <form [formGroup]="reviewForm" (ngSubmit)="handleSubmit()">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="w-full">
              <label
                for="rating"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Rating</label
              >
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                formControlName="rating"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="4"
              />
            </div>

          </div>
          <div class="w-full mt-6">
            <label for="review" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea
              formControlName="review"
              rows="8"
              class="block p-2.5 w-full text-sm
                text-gray-900 bg-gray-50
                rounded-lg border border-gray-300
                focus:ring-blue-500 focus:border-blue-500
                dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500"
                placeholder="Leave a comment..."></textarea>
          </div>

          <div class="w-full mt-6 text-center">
            <button
              [disabled]="isLoading"
              type="submit"
              class="w-full
                px-6 py-2.5 mt-4 sm:mt-6
                text-sm font-medium
                text-white bg-blue-700
                rounded-lg focus:ring-4
                focus:ring-blue-200
                dark:focus:ring-blue-900
                hover:bg-blue-800"
            >
              <svg *ngIf="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              <span *ngIf="isLoading; else newMedication">Loading...</span>
              <ng-template #newMedication>
                <span>Save changes</span>
              </ng-template>
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class ReviewEditComponent {
  @Input() review_id = '';
  isLoading:boolean = false;
  medicationId = signal('');
  #router = inject(Router);
  #reviewService = inject(ReviewService);
  reviewForm = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: ['1', Validators.required]
  })
  ngOnInit() {
    this.medicationId.set(this.#reviewService.currentMedicationId());
    this.loadReview();
  }
  loadReview() {
    this.#reviewService.getReview(this.medicationId(), this.review_id)
      .subscribe(response => {
        const { success, data } = response;
        if(success) {
          this.reviewForm.get('review')?.setValue(data.review);
          this.reviewForm.get('rating')?.setValue(JSON.stringify(data.rating));
        }
      })
  }

  handleSubmit() {
    if(this.reviewForm.valid) {
      const review = this.reviewForm.get('review')?.value as string;
      const rating = this.reviewForm.get('rating')?.value as string;

      this.#reviewService.updateReview(this.medicationId(), {review, rating }, this.review_id).subscribe(response => {
        console.log('addReview ',response);
        this.#router.navigate(['/medications', this.medicationId(), 'reviews'])
      })
    }
  }
}
