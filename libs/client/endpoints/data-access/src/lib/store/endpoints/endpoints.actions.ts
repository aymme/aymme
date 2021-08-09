import { createAction, props } from '@ngrx/store';
import { EndpointsEntity } from './endpoints.models';

export const openEndpoint = createAction(
  '[Collection/Endpoints/List] Open endpoint',
  props<{ projectId: string; endpointId: string }>()
);

export const loadEndpointSuccess = createAction(
  '[Endpoints/API] Load Endpoint Success',
  props<{ endpoint: EndpointsEntity }>()
);

export const loadEndpointFailure = createAction(
  '[Endpoints/API] Load Endpoint Failure',
  props<{ error: unknown }>()
);
