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
  {
    path: '',
    loadChildren: () =>
      import('./features/general/general.routes').then((m) => m.GENERAL_ROUTES),
    // canActivate: [authGuard],
  },
];
