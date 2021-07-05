import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';

import { LanguageSwitcherModule } from '@Components/language-switcher/language-switcher.module';
import { ThemeSwitcherModule } from '@Components/theme-switcher/theme-switcher.module';
import { ComponentsType, ModulesType } from '@Types/module.types';

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
  TranslateModule.forChild({}),
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
