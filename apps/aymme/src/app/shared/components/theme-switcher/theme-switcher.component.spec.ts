import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

import { ThemeSwitcherService } from '@Components/theme-switcher/services/theme-switcher.service';
import { Spied } from '@Specs/types/utils.type';

import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', (): void => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let mockedThemeSwitcherService: Spied<ThemeSwitcherService>;

  beforeEach(waitForAsync((): void => {
    mockedThemeSwitcherService = {
      ...jasmine.createSpyObj(ThemeSwitcherService, ['changeTheme']),
      isDarkTheme: false,
    };

    TestBed.configureTestingModule({
      imports: [
        MockModule(InputSwitchModule),
        MockModule(FormsModule),
      ],
      declarations: [
        ThemeSwitcherComponent,
      ],
      providers: [
        { provide: ThemeSwitcherService, useValue: mockedThemeSwitcherService },
      ],
    })
    .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', (): void => {
    it('should set isDarkTheme to themeSwitcherService.isDarkTheme', (): void => {
      expect(component.isDarkTheme).toEqual(mockedThemeSwitcherService.isDarkTheme);
    });
  });

  describe('changeTheme', (): void => {
    it('should call themeSwitcherService.changeTheme', (): void => {
      component.changeTheme();

      expect(mockedThemeSwitcherService.changeTheme).toHaveBeenCalledOnceWith(component.isDarkTheme);
    });
  });
});
