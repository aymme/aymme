import { createAction, props } from '@ngrx/store';
import { EndpointEntity } from '@aymme/client/mock/model';

export const loadEndpoint = createAction('[Endpoint Page] Load Endpoint ', props<{ endpointId: string }>());
export const loadEndpointSuccess = createAction(
  '[Endpoint/API] Load Endpoint Success',
  props<{ endpoint: EndpointEntity }>()
);
export const loadEndpointFailure = createAction('[Endpoint/API] Load Endpoint Failure', props<{ error: any }>());

export const updateEndpoint = createAction(
  '[Endpoint Page] Update Endpoint',
  props<{ data: Partial<EndpointEntity> }>()
);
export const updateEndpointSuccess = createAction('[Endpoint/API] Update Endpoint Success');
export const updateEndpointFailure = createAction('[Endpoint/API] Update Endpoint Failure', props<{ error: any }>());
