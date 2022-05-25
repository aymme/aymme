import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToUseComponent } from './how-to-use.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HowToUseComponent,
      },
    ]),
    FontAwesomeModule,
  ],
  declarations: [HowToUseComponent],
  exports: [HowToUseComponent],
})
export class HowToUseModule {}
