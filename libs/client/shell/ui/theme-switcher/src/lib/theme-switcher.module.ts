import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';

import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, InputSwitchModule, FormsModule],
  declarations: [
    ThemeSwitcherComponent
  ],
  exports: [
    ThemeSwitcherComponent
  ],
})
export class ThemeSwitcherModule {}
