import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ComponentsType, ModulesType } from '@Types/module.types';

import { ThemeSwitcherService } from './services/theme-switcher.service';
import { ThemeSwitcherComponent } from './theme-switcher.component';

const components: ComponentsType = [
  ThemeSwitcherComponent,
];

const primeNgModules: ModulesType = [
  InputSwitchModule,
];

const modules: ModulesType = [
  ...primeNgModules,
  CommonModule,
  FormsModule,
];

const services: Provider[] = [
  ThemeSwitcherService,
];

const providers: Provider[] = [
  ...services,
];

@NgModule({
  declarations: [ ...components ],
  imports: [ ...modules ],
  providers: [ ...providers ],
  exports: [ ...components ],
})
export class ThemeSwitcherModule {
}
