import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEndpoints from './store/endpoints/endpoints.reducer';
import { EndpointsEffects } from './store/endpoints/endpoints.effects';
import { EndpointsFacade } from './store/endpoints/endpoints.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromEndpoints.ENDPOINTS_FEATURE_KEY,
      fromEndpoints.reducer
    ),
    EffectsModule.forFeature([EndpointsEffects]),
  ],
  providers: [EndpointsFacade],
})
export class DataAccessModule {}
