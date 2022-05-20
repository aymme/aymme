import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '@aymme/client/shared/app-config';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: APP_CONFIG, useValue: {} }],
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
