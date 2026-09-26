import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'demo',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/demo/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'pipeline',
        loadComponent: () =>
          import('./features/demo/pipeline.component').then((m) => m.PipelineComponent),
      },
      {
        path: 'escritos',
        loadComponent: () =>
          import('./features/demo/escritos.component').then((m) => m.EscritosComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
