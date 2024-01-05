import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="border-b-2 border-sky-900">
      <div class="flex items-center justify-between px-8 bg-white">
        <div class="w-auto">
          <div class="flex flex-wrap items-center">
            <div class="w-auto lg:block">
              <a [routerLink]="['/home']" class="text-2xl font-bold">Medi<span class="text-white bg-gray-800 px-3 pb-1 rounded-lg border-2">X</span></a>
            </div>
          </div>
        </div>
        <div class="w-auto">
          <div class="flex flex-wrap items-center">
            <div class="w-auto lg:block">
              <div class="flex flex-wrap -m-2">
                  <div class="w-full md:w-auto p-2" *ngIf="isLoggedIn">
                    <a class="block w-full px-4 py-2.5
                      text-sm text-center text-white
                      font-bold bg-green-500
                      hover:bg-green-100
                      focus:ring-4 focus:ring-green-200
                      border rounded-full" [routerLink]="['/medications', 'new']">New Medication
                    </a>
                  </div>

                  <div class="w-full md:w-auto p-2" *ngIf="!isLoggedIn">
                    <a class="block w-full px-4 py-2.5 text-sm
                      text-center text-gray-900
                      font-bold bg-white
                      hover:bg-gray-50 focus:ring-4
                      focus:ring-gray-200
                      border rounded-full"
                      [routerLink]="['/login']"
                    data-config-id="auto-txt-5-2">Log In</a>
                  </div>
                  <div class="w-full md:w-auto p-2" *ngIf="!isLoggedIn">
                    <a
                      class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                      [routerLink]="['/register']">Register
                    </a>
                  </div>

                  <div class="w-full md:w-auto p-2 relative" *ngIf="isLoggedIn">
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                      <button
                        (click)="toggleMenu()"
                        type="button"
                        class="flex text-sm text-center p-2
                        bg-gray-100 font-medium rounded-full
                        ring-4 ring-gray-300
                        dark:focus:ring-gray-600"
                        >
                        <span class="text-center" >{{ avatar | uppercase }}</span>
                      </button>

                      <div
                        [ngClass]="getMenuStyle()">
                        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{{ authState().fullname }}</div>
                            <div class="font-medium truncate">{{ authState().email }}</div>
                          </div>
                          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                            <li>
                              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
                            </li>
                          </ul>
                          <div class="py-1">
                            <a
                              (click)="logout()"
                              class="block px-4 py-2 cursor-pointer
                                text-sm text-gray-700
                                hover:bg-gray-100
                                dark:hover:bg-gray-600
                                dark:text-gray-200
                                dark:hover:text-white">Sign out</a>
                          </div>
                      </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  authState= signal(this.#authService.authState());
  isLoggedIn = this.#authService.isAuthenticated();
  avatar: string = '';
  isMenuVisible = signal(false);

  ngOnInit() {
    this.getAvatar();
  }

  logout() {
    localStorage.removeItem('localState');
    this.#authService.authState.set({ _id: '', fullname: '', email: '', jwt: '' });
    this.authState.set(this.#authService.authState());
    this.isLoggedIn = this.#authService.isAuthenticated();
    this.#router.navigate(['home']);
  }

  toggleMenu() {
    this.isMenuVisible.set(!this.isMenuVisible());
  }

  getMenuStyle() {
    const style = `w-42 z-50 my-4 text-base list-none
    ${this.isMenuVisible() ? '' : 'hidden'}
    bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700
    dark:divide-gray-600 absolute top-6 right-5 mx-0`;
    return style;
  }

  getAvatar() {
    const [a,b] = this.authState().fullname.split('');
    this.avatar = a + b;
  }
}
