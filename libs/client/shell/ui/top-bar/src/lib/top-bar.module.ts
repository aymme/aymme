import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';

import { LogoModule } from '@aymme/client/shell/ui/logo';
import { ThemeSwitcherModule } from '@aymme/client/shell/ui/theme-switcher';

@NgModule({
  imports: [CommonModule, LogoModule, ThemeSwitcherModule],
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ],
})
export class TopBarModule { }
