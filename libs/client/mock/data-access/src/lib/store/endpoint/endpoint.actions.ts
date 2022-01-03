import { createAction, props } from '@ngrx/store';
import { EndpointEntity } from './endpoint.models';

export const loadEndpoint = createAction('[Endpoint Page] Load Endpoint ', props<{ endpointId: string }>());

export const loadEndpointSuccess = createAction(
  '[Endpoint/API] Load Endpoint Success',
  props<{ endpoint?: EndpointEntity }>()
);

export const loadEndpointFailure = createAction('[Endpoint/API] Load Endpoint Failure', props<{ error: any }>());
