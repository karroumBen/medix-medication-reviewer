import { Component, inject } from '@angular/core';
import { MedicationService } from '../medication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-medication',
  template: `
    <section class="bg-white dark:bg-gray-900 w-screen h-screen">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new medication
        </h2>
        <form [formGroup]="medicationForm" (ngSubmit)="handleSubmit()">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                type="text"
                name="name"
                formControlName="name"
                class="bg-gray-50 border border-gray-300
                  text-gray-900 text-sm rounded-lg
                  focus:ring-blue-600
                  focus:border-blue-600
                  block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                placeholder="Type medication name"
              />
            </div>
            <div class="w-full">
              <label
                for="generic_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Generic name</label
              >
              <input
                type="text"
                name="generic_name"
                formControlName="generic_name"
                class="bg-gray-50 border
                  border-gray-300 text-gray-900
                  text-sm rounded-lg
                  focus:ring-blue-600
                  focus:border-blue-600
                  block w-full p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                placeholder="medication known also as"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="classification"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Classification</label
              >
              <input
                type="text"
                name="medication_class"
                formControlName="medication_class"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="great"
              />
            </div>
            <div>
              <label
                for="availability"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Availability</label
              >
              <select
                formControlName="availability"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Prescription">Prescription</option>
                <option value="OTC">OTC</option>
              </select>
            </div>

          </div>
          <div class="w-full mt-6">
            <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center
                    justify-center w-full
                    h-64 border-2 border-gray-300
                    border-dashed rounded-lg
                    cursor-pointer bg-gray-50
                    dark:hover:bg-bray-800
                    dark:bg-gray-700 hover:bg-gray-100
                    dark:border-gray-600
                    dark:hover:border-gray-500
                    dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hformControlNameden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" (change)="handleFileChange($event)"/>
                    <label *ngIf="image?.name">{{image.name}}</label>
                </label>
            </div> 
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
                <span>Add Medication</span>
              </ng-template>
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [],
})
export class NewMedicationComponent {
  #router = inject(Router);
  image: any;
  isLoading:boolean = false;
  #medicationService = inject(MedicationService);
  medicationForm = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    generic_name: '',
    medication_class: '',
    availability: '',
  })
  handleFileChange(payload:any) {
    this.image = payload.target.files[0];
  }

  handleSubmit() {
    if(this.medicationForm.valid) {
      this.isLoading = true;
      const name = this.medicationForm.get('name')?.value as string;
      const generic_name = this.medicationForm.get('generic_name')?.value as string; 
      const medication_class = this.medicationForm.get('medication_class')?.value as string;
      const availability = this.medicationForm.get('availability')?.value as string;

      this.#medicationService.addNewMedication({
        name,
        generic_name,
        medication_class,
        availability },
        this.image)
      .subscribe(response => {
        this.isLoading = false;
        this.medicationForm.reset();
        this.#router.navigate(['home']);
      })
    }
  }

  

}
