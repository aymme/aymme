import { TestBed } from '@angular/core/testing';

import { EndpointService } from './endpoint.service';
import { APP_CONFIG } from '@aymme/client/shared/app-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APP_CONFIG, useValue: {} }],
    });
    service = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
