import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import * as fromEndpoint from './store/endpoint/endpoint.reducer';
import { EndpointEffects } from './store/endpoint/endpoint.effects';
import { EndpointFacade } from './store/endpoint/endpoint.facade';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromEndpoint.ENDPOINT_FEATURE_KEY, fromEndpoint.reducer),
    EffectsModule.forFeature([EndpointEffects]),
  ],
  providers: [EndpointFacade, DataPersistence],
})
export class ClientMockDataAccessModule {}
