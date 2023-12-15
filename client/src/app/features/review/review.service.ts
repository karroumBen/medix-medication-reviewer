import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Review } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  #http = inject(HttpClient);
  currentMedicationId = signal('');

  getReview(medicationId: string, reviewId: string) {
    return this.#http.get<{ success: boolean, data: Review }>(environment.apiUrl+`medications/${medicationId}/reviews/${reviewId}`);
  }

  getReviews(medicationId: string) {
    return this.#http.get<{ success: boolean, data: Review[] }>(environment.apiUrl+`medications/${medicationId}/reviews`);
  }

  addReview(medicationId: string, payload: { review: string, rating: string }) {
    return this.#http.post<{success: boolean, data: string }>(environment.apiUrl+`medications/${medicationId}/reviews`, payload);
  }

  updateReview(medicationId: string, payload: { review: string, rating: string }, reviewId: string) {
    return this.#http.put<{success: boolean, data: boolean }>(environment.apiUrl+`medications/${medicationId}/reviews/${reviewId}`, payload);
  }

  removeReview(medicationId: string, reviewId: string) {
    return this.#http.delete<{success: boolean, data: boolean }>(environment.apiUrl+`medications/${medicationId}/reviews/${reviewId}`);
  }
  setCurrentMedicationId(medicationId: string) {
    this.currentMedicationId.set(medicationId);
  }
}