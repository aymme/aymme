import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToUseComponent } from './how-to-use.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HowToUseComponent,
      },
    ]),
  ],
  declarations: [HowToUseComponent],
  exports: [HowToUseComponent],
})
export class HowToUseModule {}
