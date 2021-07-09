import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { TopBarModule } from '@aymme/client/shell/ui/top-bar';
import { LogoModule } from '@aymme/client/shell/ui/logo';

import { RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, RouterModule, TopBarModule, LogoModule],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ],
})
export class LayoutModule { }
