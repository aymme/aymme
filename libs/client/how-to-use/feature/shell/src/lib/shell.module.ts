import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: async () => (await import('@aymme/client/how-to-use/feature/how-to-use')).HowToUseModule,
      },
    ]),
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class ShellModule {}
