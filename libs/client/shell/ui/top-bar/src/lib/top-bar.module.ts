import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';

import { LogoModule } from '@aymme/client/shell/ui/logo';
import { ThemeSwitcherModule } from '@aymme/client/shell/ui/theme-switcher';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, RouterModule, LogoModule, ThemeSwitcherModule, FontAwesomeModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}
