import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CollectionsEffects } from './collections.effects';
import { CollectionService } from '../../services/collection.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';
import { CollectionsActions } from './';

describe('CollectionsEffects', () => {
  let actions: Observable<Action>;
  let effects: CollectionsEffects;
  let service: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        getAppConfigProvider({ apiUrl: '', production: false }),
        CollectionsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        CollectionService,
        {
          provide: ToastrService,
          useValue: jest.fn(),
        },
      ],
    });

    effects = TestBed.inject(CollectionsEffects);
    service = TestBed.inject(CollectionService);
  });

  describe('init$', () => {
    it('should work', fakeAsync(() => {
      actions = of(CollectionsActions.init({ projectId: '123' }));
      jest.spyOn(service, 'getAll').mockReturnValue(of([]));
      let output;
      effects.init$.subscribe((action) => {
        output = action;
      });

      expect(output).toBeUndefined();

      tick(500);
      expect(output).toEqual(CollectionsActions.loadCollectionsSuccess({ collections: [] }));
    }));
  });
});
