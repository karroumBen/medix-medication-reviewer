import { Component, inject, signal } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from 'src/app/types';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-review-list',
  template: `
    <div class="list-body flex flex-col gap-4 p-8 pt-0">
      <article
        class="shadow border-2 border-gray-200 bg-white p-4 rounded-lg"
        *ngFor="let review of reviews()"
      >
        <div class="flex items-center mb-4 gap-2">
          <div
            class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <span class="font-medium text-gray-600 dark:text-gray-300">{{ getAvatar(review.by.fullname) | uppercase }}</span>
          </div>
          <div class="font-medium dark:text-white">
            <p>{{ review.by.fullname }}</p>
          </div>
        </div>
        <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <svg
            class="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <svg
            class="w-4 h-4 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
        </div>
        <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed on
            <time datetime="2017-03-03 19:00">{{ review.date | date }}</time>
          </p>
        </footer>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
          {{ review.review }}
        </p>
        <aside *ngIf="hasPermission(review.by.user_id)">
          <div class="flex items-center mt-3">
            <a
              (click)="navigateToEdit(review._id)"
              class="text-gray-900 bg-white
                border border-gray-300
                focus:outline-none cursor-pointer
                hover:bg-gray-100
                focus:ring-4
                focus:ring-gray-200
                font-medium rounded-lg
                text-xs px-2 py-1.5
                dark:bg-gray-800
                dark:text-white
                dark:border-gray-600
                dark:hover:bg-gray-700
                dark:hover:border-gray-600
                dark:focus:ring-gray-700"
              >Edit</a
            >
            <a
              (click)="deleteReview(review._id)"
              class="ps-4 text-sm cursor-pointer
                font-medium text-blue-600
                hover:underline
                dark:text-blue-500
                border-gray-200 ms-4
                border-s md:mb-0
                dark:border-gray-600"
              >Remove
            </a>
          </div>
        </aside>
      </article>
    </div>
  `,
  styles: [],
})
export class ReviewListComponent {
  test: string[] = ['A', 'B', 'C'];
  medicationId = signal('');
  reviews = signal(new Array<Review>());
  #reviewService = inject(ReviewService);
  #authService = inject(AuthService);
  #router = inject(Router);

  ngOnInit() {
    this.medicationId.set(this.#reviewService.currentMedicationId());
    this.loadAllReviews();
  }

  loadAllReviews() {
    this.#reviewService
      .getReviews(this.medicationId())
      .subscribe((response) => {
        if (response.success) {
          this.reviews.set(response.data);
        }
      });
  }
  getAvatar(fullname: string) {
    const [a,b] = fullname.split('');
    return a + b;
  }
  deleteReview(reviewId: string) {
    this.#reviewService.removeReview(this.medicationId(), reviewId)
      .subscribe(response => {
        this.reviews.set(this.reviews().filter(item => item._id != reviewId));
        this.#router.navigate(['/medications', this.medicationId(), 'reviews'])
      })
  }
  navigateToEdit(reviewId:string) {
    this.#router.navigate(['/medications', this.medicationId(), 'reviews', reviewId])
  }
  hasPermission(userId:string) {
    return this.#authService.authState()._id === userId;
  }
}
