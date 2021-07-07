import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', (): void => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockComponent(NavigationBarComponent),
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
