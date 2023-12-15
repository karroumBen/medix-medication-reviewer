import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { User } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  authState = signal({ _id: '', fullname: '', email: '', jwt: '' });

  constructor() {
    const localState = localStorage.getItem('localState');

    if(localState) {
      this.authState.set(JSON.parse(localState));
    }
  }
  isAuthenticated() {
    return !!this.authState().jwt;
  }

  signup(payload: { fullname: string; email: string; password: string }) {
    return this.#http.post<{ success: boolean; data: User }>(
      environment.apiUrl + `users/signup`,
      payload
    );
  }

  signin(credentials: { email: string; password: string }) {
    return this.#http.post<{ success: boolean; data: string }>(
      environment.apiUrl + `users/signin`,
      credentials
    );
  }
}

export interface AuthState {
  _id: string,
  fullname: string,
  email: string,
  jwt: string
}