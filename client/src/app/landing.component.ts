import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    

            
    <section class="landing-page">
      <div class="call-to-action">
        <div class="pt-4 pr-4">
          <h1 class="font-heading mb-4 text-3xl text-gray-900 font-black">
            Unlock better health with Pastour Medication Review Tool </h1>
          <h2 class="font-medium">Your pathway to optimal well-being</h2>
        </div>
        <button
          type="button"
          class="text-white bg-blue-700 mt-8
            hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300
            font-medium rounded-lg
            text-sm px-5 py-2.5 me-2 mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700
            focus:outline-none
            dark:focus:ring-blue-800"
            >Get started</button>
      </div>

      <div class="illustration">
        <img src="../assets/tablets.jpg" alt="">
      </div>
    </section>
  `,
  styleUrls: [],
})
export class LandingComponent {

}
