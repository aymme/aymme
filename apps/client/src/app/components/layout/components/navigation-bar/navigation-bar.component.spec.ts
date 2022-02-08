import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import { LanguageSwitcherComponent } from '@Components/language-switcher/language-switcher.component';
import { ThemeSwitcherModule } from '@Components/theme-switcher/theme-switcher.module';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', (): void => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ThemeSwitcherModule)
      ],
      declarations: [
        NavigationBarComponent,
        MockComponent(LanguageSwitcherComponent),
      ],
    })
    .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
