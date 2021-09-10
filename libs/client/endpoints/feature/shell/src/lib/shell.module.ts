import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: async () =>
          (await import('@aymme/client/endpoints/feature/endpoints'))
            .EndpointsModule,
      },
    ]),
  ],
  declarations: [],
})
export class ShellModule {}
