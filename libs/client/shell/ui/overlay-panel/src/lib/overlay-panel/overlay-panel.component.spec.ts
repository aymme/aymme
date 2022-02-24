import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayPanelComponent } from './overlay-panel.component';

describe('OverlayPanelComponent', () => {
  let component: OverlayPanelComponent;
  let fixture: ComponentFixture<OverlayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
