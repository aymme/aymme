import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointListComponent } from './endpoint-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { Observable } from 'rxjs';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

describe('EndpointListComponent', () => {
  let component: EndpointListComponent;
  let fixture: ComponentFixture<EndpointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointListComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        {
          provide: CollectionsFacade,
          useValue: {
            init: jest.fn(),
          },
        },
        { provide: ProjectsFacade, useValue: {} },
        {
          provide: EndpointFacade,
          useValue: {
            endpoint$: new Observable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
