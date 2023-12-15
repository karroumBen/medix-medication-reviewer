import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Medication } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  #http = inject(HttpClient);

  getMedicationList(letter: string) {
    return this.#http.get<{ success: boolean; data: Medication[] }>(
      environment.apiUrl + `medications?first_letter=${letter}`
    );
  }

  getMedicationById(medicationId: string) {
    return this.#http.get<{ success: boolean; data: Medication }>(
      environment.apiUrl + `medications/${medicationId}`
    );
  }

  addNewMedication(
    payload: {
      name: string;
      generic_name: string;
      medication_class: string;
      availability: string;
    },
    image: File | null
  ) {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('generic_name', payload.generic_name);
    formData.append('medication_class', payload.medication_class);
    formData.append('availability', payload.availability);

    if (image) {
      formData.append('medication_image', image);
    }

    return this.#http.post<{ success: boolean; data: Medication }>(
      environment.apiUrl + 'medications',
      formData
    );
  }

  updateMedication(
    payload: {
      _id: string;
      name: string;
      generic_name: string;
      medication_class: string;
      availability: string;
    },
    image: File | null
  ) {
    const formData = new FormData();
    formData.append('_id', payload._id);
    formData.append('name', payload.name);
    formData.append('generic_name', payload.generic_name);
    formData.append('medication_class', payload.medication_class);
    formData.append('availability', payload.availability);

    if (image) {
      formData.append('medication_image', image);
    }

    return this.#http.put<{ success: boolean; data: Medication }>(
      environment.apiUrl + `medications/${payload._id}`,
      formData
    );
  }

  removeMedication(medicationId: string) {
    return this.#http.delete<{ success: boolean; data: boolean }>(
      environment.apiUrl + `medications/${medicationId}`
    );
  }
  getMedicationImage(imageId: string) {
    return this.#http.get<{ data: string }>(
      environment.apiUrl + `medications/images/${imageId}`
    );
  }
}

export interface MedicationReqBody {
  name: string;
  generic_name: string;
  medication_class: string;
  availability: string;
}
