import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('./features/employees/employees.routes').then(
        (m) => m.EMPLOYEES_ROUTES
      ),
    // canActivate: [authGuard],
  },
];
