import { createAction, props } from '@ngrx/store';
import { CollectionsEntity } from './collections.models';

export const init = createAction('[Collections Page] Init', props<{ projectId: string }>());

export const loadCollectionsSuccess = createAction(
  '[Collections/API] Load Collections Success',
  props<{ collections: CollectionsEntity[] }>()
);

export const loadCollectionsFailure = createAction(
  '[Collections/API] Load Collections Failure',
  props<{ error: any }>()
);

export const updateCollectionsSuccess = createAction(
  '[Collections/API] Update Collections Success',
  props<{ result: any }>()
);
export const updateCollectionsFailure = createAction(
  '[Collections/API] Update Collections Failure',
  props<{ error: any }>()
);

export const moveEndpointInCollection = createAction(
  '[Collections] Move Endpoint in Collection',
  props<{ data: any }>()
);

export const moveEndpointToOtherCollection = createAction(
  '[Collections] Move Endpoint to Other Collection',
  props<{ data: any }>()
);
