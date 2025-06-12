import { Routes } from '@angular/router';
import { ShowRegisterEmployeeComponent } from './pages/show-register-employee/show-register-employee.component';
import { ShowRegisterVacationsComponent } from './pages/show-register-vacations/show-register-vacations.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'cadastro',
    component: ShowRegisterEmployeeComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'ferias',
    component: ShowRegisterVacationsComponent,
    // canActivate: [authGuard],
  },
];
