import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { IconsModule } from '@aymme/client/shell/ui/icons';

import { webShellRoutes } from './web-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
    StoreModule.forRoot({
      router: routerReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    IconsModule,
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ClientShellFeatureModule {}
