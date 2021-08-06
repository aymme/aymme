import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointLinkComponent } from './endpoint-link.component';

describe('EndpointLinkComponent', () => {
  let component: EndpointLinkComponent;
  let fixture: ComponentFixture<EndpointLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
