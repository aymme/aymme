import { Route } from '@angular/router';
import { LayoutComponent } from '@aymme/client/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        loadChildren: async () => (await import('@aymme/client/projects/feature/shell')).ShellModule,
      },
      // {
      //   path: 'projects/:projectId/mock',
      //   loadChildren: async () =>
      //     (await import('@aymme/client/mock/feature')).MockModule,
      // },
    ],
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/projects' },
];
