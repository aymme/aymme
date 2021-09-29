import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsType, ModulesType } from '../../shared/types/module.types';
import { LanguageSwitcherComponent } from './language-switcher.component';

const components: ComponentsType = [
  LanguageSwitcherComponent,
];

const primeNgModules: ModulesType = [
  ButtonModule,
];

const modules: ModulesType = [
  ...primeNgModules,
  CommonModule,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  exports: [...components],
})
export class LanguageSwitcherModule { }
