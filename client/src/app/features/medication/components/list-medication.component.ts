import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicationService } from '../medication.service';
import { Medication } from 'src/app/types';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  template: `
    <app-navbar />

    <section class="w-screen flex gap-2 p-5 items-start">
      <section class="search-btns p-5 bg-white dark:bg-gray-900 flex flex-wrap justify-center row-start-1 row-end-2 rounded-lg border-2 border-gray-200">
        <div class="wrapper flex flex-wrap items-center gap-1">
          <h2 class="text-lg font-bold mb-4 text-gray-500">Medications starts with</h2>
          <div class="button-group flex flex-wrap items-center gap-1">
            <button
              *ngFor="let letter of letters"
              (click)="setLetter(letter)"
              type="button"
              class="focus:outline-none text-white
              bg-gray-700 hover:bg-gray-800
              focus:ring-4 focus:ring-gray-300
              font-medium rounded-lg text-sm
              px-5 py-2.5 mb-2 dark:bg-gray-600
              dark:hover:bg-gray-700
              dark:focus:ring-gray-900">{{ letter }}
            </button>
          </div>
        </div>
      </section>

      <section class="medication-list flex-1">
        <div class="list-body flex flex-wrap gap-4 p-8 pt-0">
          <article *ngFor="let medication of medications">
            <a
              [routerLink]="['/medications', medication._id,'reviews']"
              class="text-center block
                max-w-sm p-6
                bg-white border
                border-gray-200
                rounded-lg shadow
                hover:bg-gray-100
                dark:bg-gray-800
                dark:border-gray-700
                dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{medication.name}}</h5>
            </a>
          </article>
        </div>
      </section>
    </section>
  `,
  styles: [`
    .search-btns {
      max-width: 400px;
    }
  `]
})
export class ListMedicationComponent {
  #letter = signal('A');
  medications: Medication[] = [];
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #medicationService = inject(MedicationService);
  letters: string[] = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'.split('');
  ngOnInit() {
    this.setLetter(this.#letter());
    console.log(this.#letter());
    this.#activatedRoute.queryParamMap.pipe(map(item => item.get('first_letter'))).subscribe(item => {
      this.#letter.set(item || '');
    });
  }

  setLetter(letter:string) {
    this.#router.navigate([], {
      queryParams: { first_letter: letter},
      replaceUrl: true,
      relativeTo: this.#activatedRoute
    });
    this.#letter.set(letter);
    this.loadMedications();
  }
  loadMedications() {
    console.log('loadMedications')
    this.#medicationService.getMedicationList(this.#letter())
      .subscribe(response => {
        if(response.success) {
          this.medications = response.data;
        }
      })
  }
}
