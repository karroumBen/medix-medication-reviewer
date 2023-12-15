import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login.component';
import { RegisterComponent } from './features/auth/components/register.component';
import { ListMedicationComponent } from './features/medication/components/list-medication.component';
import { NewMedicationComponent } from './features/medication/components/new-medication.component';
import { EditMedicationComponent } from './features/medication/components/edit-medication.component';
import { MedicationDetailsComponent } from './features/medication/components/medication-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'medications', pathMatch: 'full'},
  { path: 'medications', component: ListMedicationComponent },
  { path: 'medications/new', component: NewMedicationComponent },
  {
    path: 'medications/:medication_id',
    component: MedicationDetailsComponent,
    children: [
      {
        path: 'reviews', loadChildren: () => import('../app/features/review/review.module').then(m => m.ReviewModule)
      }
    ]
  },
  { path: 'medications/:medication_id/edit', component: EditMedicationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'medications' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
