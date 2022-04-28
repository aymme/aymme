import { createAction, props } from '@ngrx/store';
import { EndpointEntity, ResponseEntity, UpdateEndpointDto } from '@aymme/client/mock/model';

export const loadEndpoint = createAction('[Endpoint Page] Load Endpoint ', props<{ endpointId: string }>());
export const loadEndpointSuccess = createAction(
  '[Endpoint/API] Load Endpoint Success',
  props<{ endpoint: EndpointEntity }>()
);
export const loadEndpointFailure = createAction('[Endpoint/API] Load Endpoint Failure', props<{ error: any }>());

export const updateEndpoint = createAction('[Endpoint Page] Update Endpoint', props<{ data: UpdateEndpointDto }>());
export const updateEndpointSuccess = createAction('[Endpoint/API] Update Endpoint Success');
export const updateEndpointFailure = createAction('[Endpoint/API] Update Endpoint Failure', props<{ error: any }>());

export const removeEndpoint = createAction(
  '[Endpoint/API] Remove Endpoint',
  props<{ collectionId: string; endpointId: string }>()
);

export const addNewResponse = createAction(
  '[Endpoint/API] Add New Response',
  props<{ response: number; body: string }>()
);

export const removeResponse = createAction('[Endpoint/API] Remove Response', props<{ response: ResponseEntity }>());
