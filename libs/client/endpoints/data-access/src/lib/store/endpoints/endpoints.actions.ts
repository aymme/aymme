import { createAction, props } from '@ngrx/store';
import { EndpointsEntity } from './endpoints.models';

export const init = createAction(
  '[Endpoints Page] Init',
  props<{ projectId: string }>()
);

export const loadEndpointsSuccess = createAction(
  '[Endpoints/API] Load Endpoints Success',
  props<{ endpoints: EndpointsEntity[] }>()
);

export const loadEndpointsFailure = createAction(
  '[Endpoints/API] Load Endpoints Failure',
  props<{ error: unknown }>()
);
