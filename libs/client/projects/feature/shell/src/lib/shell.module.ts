import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@aymme/client/projects/data-access';

@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: async () =>
          (await import('@aymme/client/projects/feature/projects'))
            .ProjectsModule,
      },
    ]),
  ],
  providers: [],
})
export class ShellModule {}
