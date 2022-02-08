import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsType, ModulesType } from '../../shared/types/module.types';
import { LanguageSwitcherModule } from '../language-switcher/language-switcher.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LayoutComponent } from './layout.component';

const modules: ModulesType = [
  CommonModule,
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
