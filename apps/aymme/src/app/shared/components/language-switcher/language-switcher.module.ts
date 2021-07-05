import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { ComponentsType, ModulesType } from '@Types/module.types';

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
  TranslateModule.forChild({}),
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  exports: [...components],
})
export class LanguageSwitcherModule { }
