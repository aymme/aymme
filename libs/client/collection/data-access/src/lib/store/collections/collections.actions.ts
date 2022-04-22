import { createAction, props } from '@ngrx/store';
import { CollectionsEntity } from './collections.models';

export const init = createAction('[Collections Page] Init', props<{ projectId: string }>());

export const refresh = createAction('[Collection/API] refresh', props<{ projectId: string }>());

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

export const removeEndpointSuccess = createAction(
  '[Collections] Remove Endpoint Success',
  props<{ collectionId: string; endpointId: string }>()
);

export const removeEndpointFailure = createAction('[Collections] Remove Endpoint Failure');

export const removeEndpointFromCollection = createAction(
  '[Collections] Remove Endpoint from Collection',
  props<{ collectionId: string; endpointId: string }>()
);

export const createNewCollection = createAction(
  '[Collections] Add New Collection',
  props<{ projectId: string; name: string }>()
);

export const createNewCollectionSuccess = createAction(
  '[Collections] Add New Collection Sucess',
  props<{ collection: any }>()
);

export const createNewCollectionFailure = createAction(
  '[Collections] Add New Collection Failure',
  props<{ error: Response | null | undefined }>()
);

export const deleteCollection = createAction(
  '[Collections] Delete Collection',
  props<{ collection: CollectionsEntity }>()
);

export const deleteCollectionSuccess = createAction(
  '[Collections] Delete Collection Success',
  props<{ collection: CollectionsEntity }>()
);

export const deleteCollectionFailure = createAction(
  '[Collections] Delete Collection Success',
  props<{ error: Response | null | undefined }>()
);

export const updateCollection = createAction(
  '[Collection] update collection',
  props<{ data: any; collection: CollectionsEntity }>()
);

export const updateCollectionOrder = createAction('[Collections] Update Collection Order', props<{ data: any }>());

export const toggleCompressed = createAction(
  '[Collection] toggle compressed',
  props<{ collection: CollectionsEntity }>()
);
