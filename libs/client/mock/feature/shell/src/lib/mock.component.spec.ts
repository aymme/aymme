import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionsFacade } from '@aymme/client/collection/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { Observable } from 'rxjs';

import { MockComponent } from './mock.component';

describe('MockComponent', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, MatDialogModule],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
