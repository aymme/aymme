import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ThemeSwitcherComponent
  ],
  exports: [
    ThemeSwitcherComponent
  ],
})
export class ThemeSwitcherModule {}
