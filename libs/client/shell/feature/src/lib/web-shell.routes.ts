import { Route } from '@angular/router';
import { LayoutComponent } from '@aymme/client/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@aymme/client/projects/feature')).ProjectsModule
      },
    ]
  }
]
