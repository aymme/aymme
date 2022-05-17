import { TestBed } from '@angular/core/testing';

import { EndpointService } from './endpoint.service';
import { APP_CONFIG } from '@aymme/client/shared/app-config';

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: APP_CONFIG, useValue: {} }],
    });
    service = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
