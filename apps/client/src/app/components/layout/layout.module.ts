import { MenubarModule } from 'primeng/menubar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsType, ModulesType } from '../../shared/types/module.types';
import { LanguageSwitcherModule } from '../language-switcher/language-switcher.module';
import { ThemeSwitcherModule } from '../theme-switcher/theme-switcher.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LayoutComponent } from './layout.component';

const primeNgModules: ModulesType = [
  MenubarModule,
];

const modules: ModulesType = [
  ...primeNgModules,
  CommonModule,
  ThemeSwitcherModule,
  LanguageSwitcherModule,
];

const components: ComponentsType = [
  LayoutComponent,
  NavigationBarComponent,
];

@NgModule({
  imports: [ ...modules ],
  declarations: [ ...components ],
  exports: [ ...components ],
})
export class LayoutModule {
}
