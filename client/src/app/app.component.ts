import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    body {
      background-color: #f1f1f1;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Medication Review';
}
