import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterModule } from '@aymme/client/shell/ui/footer';
import { LogoModule } from '@aymme/client/shell/ui/logo';
import { TopBarModule } from '@aymme/client/shell/ui/top-bar';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, TopBarModule, LogoModule, FooterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  providers: [],
})
export class LayoutModule {}
