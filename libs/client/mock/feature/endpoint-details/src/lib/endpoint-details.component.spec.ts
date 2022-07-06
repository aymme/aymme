import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointDetailsComponent } from './endpoint-details.component';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('EndpointDetailsComponent', () => {
  let component: EndpointDetailsComponent;
  let fixture: ComponentFixture<EndpointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointDetailsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: EndpointFacade,
          useValue: {
            endpoint$: new Observable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EndpointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
