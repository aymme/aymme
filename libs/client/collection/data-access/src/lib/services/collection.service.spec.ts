import { TestBed } from '@angular/core/testing';

import { CollectionService } from './collection.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [getAppConfigProvider({ apiUrl: '', production: false })],
    });
    service = TestBed.inject(CollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
