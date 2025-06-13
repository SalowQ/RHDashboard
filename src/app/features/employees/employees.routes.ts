import { Routes } from '@angular/router';
import { ShowEmployeeComponent } from './pages/show-employee/show-employee.component';
import { ShowVacationsComponent } from './pages/show-vacations/show-vacations.component';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'listagem',
    component: ShowEmployeeComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'cadastro',
    component: RegisterEmployeeComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'ferias',
    component: ShowVacationsComponent,
    // canActivate: [authGuard],
  },
];
