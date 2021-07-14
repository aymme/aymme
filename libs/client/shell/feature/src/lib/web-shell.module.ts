import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { webShellRoutes } from './web-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top'
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class ClientShellFeatureModule { }
