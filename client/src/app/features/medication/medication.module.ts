import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMedicationComponent } from './components/list-medication.component';
import { NewMedicationComponent } from './components/new-medication.component';
import { EditMedicationComponent } from './components/edit-medication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicationDetailsComponent } from './components/medication-details.component';
import { NavbarComponent } from 'src/app/shared/navbar.component';
import { ReviewListComponent } from '../review/components/review-list.component';



@NgModule({
  declarations: [
    ListMedicationComponent,
    NewMedicationComponent,
    EditMedicationComponent,
    MedicationDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MedicationModule { }
