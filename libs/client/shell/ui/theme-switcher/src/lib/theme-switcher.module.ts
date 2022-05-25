import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';

import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  declarations: [ThemeSwitcherComponent],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
