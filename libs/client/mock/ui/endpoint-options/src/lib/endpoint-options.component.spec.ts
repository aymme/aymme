import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointOptionsComponent } from './endpoint-options.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EndpointOptionsComponent', () => {
  let component: EndpointOptionsComponent;
  let fixture: ComponentFixture<EndpointOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndpointOptionsComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
