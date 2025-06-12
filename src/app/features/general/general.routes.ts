import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

export const GENERAL_ROUTES: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'construcao',
    component: ComingSoonComponent,
    // canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  }, // Rota coringa (deve ser a última)
];
