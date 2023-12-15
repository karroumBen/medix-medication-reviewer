import { Component, Input, inject, signal } from '@angular/core';
import { MedicationService } from '../medication.service';
import { Review } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ReviewService } from '../../review/review.service';

@Component({
  selector: 'app-medication-details',
  template: `
    <app-navbar />

    <section class="w-screen flex gap-2 p-5 items-start space-between">
      <section
        class="medication-card p-5 bg-white dark:bg-gray-900 flex flex-wrap justify-center row-start-1 row-end-2 rounded-lg border-2 border-gray-200"
      >
        <div class="wrapper flex flex-wrap items-center gap-1">
          <!-- <h2 class="text-lg font-bold mb-4 text-gray-500">Medication Card</h2>
          <div class="button-group flex flex-wrap items-center gap-1">
            
          </div> -->

          <div class="w-full bg-white dark:bg-gray-800">
            <img class="p-8 rounded-t-lg" [src]="image" alt="product image" />
            <div class="px-5 pb-5">
              <a href="#">
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ medication().name }}
                </h5>
              </a>
              <div class="flex flex-col items-start mt-2.5 mb-5 gap-1">
                <span
                  class="bg-blue-100 text-blue-800 text-md font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >
                  {{ medication().generic_name }}
                </span>
                <span
                  class="bg-orange-100 text-orange-800 text-md font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-800"
                >
                  {{ medication().availability }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ medication().medication_class }}
                </span>
              </div>
            </div>
            <div class="card-actions w-full flex justify-end gap-1">
                <a
                  *ngIf="hasPermission()"
                  [routerLink]="['/medications', medication()._id, 'edit']"
                  class="block mt-4 text-white bg-blue-700
                    hover:bg-blue-800 focus:ring-4
                    focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg
                    text-sm px-5 py-2.5
                    text-center dark:bg-blue-600
                    dark:hover:bg-blue-700
                    dark:focus:ring-blue-800"
                  >Edit</a
                >
                <a
                  *ngIf="hasPermission()"
                  (click)="deleteMedication()"
                  class="block mt-4 text-white bg-red-700
                    hover:bg-red-800 focus:ring-4
                    focus:outline-none focus:ring-red-300
                    font-medium rounded-lg cursor-pointer
                    text-sm px-5 py-2.5
                    text-center dark:bg-red-600
                    dark:hover:bg-red-700
                    dark:focus:ring-red-800"
                  >Delete</a
                >
                <a
                  (click)="handleNewReview()"
                  class="block mt-4 text-white bg-gray-700
                    hover:bg-gray-800 focus:ring-4
                    focus:outline-none focus:ring-gray-300
                    font-medium rounded-lg cursor-pointer
                    text-sm px-5 py-2.5
                    text-center dark:bg-gray-600
                    dark:hover:bg-gray-700
                    dark:focus:ring-gray-800"
                  >Add review</a
                >
            </div>
          </div>
        </div>
      </section>

      <section class="flex-1">
        <router-outlet />
      </section>
    </section>
  `,
  styles: [
    `
      .medication-card {
        max-width: 400px;
      }
    `,
  ],
})
export class MedicationDetailsComponent {
  test: string[] = ['A', 'B', 'C'];
  @Input() medication_id: string = '';
  medication = signal({
    _id: '',
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: {
      filename: '',
      originalname: '',
      _id: '',
    },
    added_by: { user_id: '', fullname: '', email: '' },
    reviews: new Array<Review>(),
  });
  image: string = environment.fileUploadUrl;
  #medicationService = inject(MedicationService);
  #authService = inject(AuthService);
  #reviewService = inject(ReviewService);
  #router = inject(Router);

  ngOnInit() {
    this.loadMedication();
    this.#reviewService.setCurrentMedicationId(this.medication_id);
  }

  hasPermission() {
    return this.#authService.authState()._id === this.medication().added_by.user_id;
  }

  loadMedication() {
    this.#medicationService
      .getMedicationById(this.medication_id)
      .subscribe((response) => {
        this.medication.set(response.data);
        console.log(this.medication());
        this.image += this.medication().image._id;
      });
  }
  deleteMedication() {
    this.#medicationService
      .removeMedication(this.medication()._id)
      .subscribe((response) => {
        console.log(response);
        this.#router.navigate(['home']);
      });
  }
  handleNewReview() {
    if(this.#authService.isAuthenticated()) {
      this.#router.navigate(['/medications', this.medication_id, 'reviews', 'new']);
    } else {
      this.#router.navigate(['login'], { queryParams: { returnUrl: this.#router.getCurrentNavigation() }});
    }
  }
}
