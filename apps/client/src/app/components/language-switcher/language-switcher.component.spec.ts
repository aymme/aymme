import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { SupportedLanguages } from '@Enums/supported-languages.enum';
import { TranslateTestingModule } from '@Mocks/translate.mock.spec';
import { Spied } from '@Specs/types/utils.type';

import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', (): void => {
  const initializeTestComponent: (language?: SupportedLanguages) => Promise<void> = async(
    language: SupportedLanguages = SupportedLanguages.English,
  ): Promise<void> => {
    mockedTranslateService = {
      ...jasmine.createSpyObj('TranslateService', ['use']),
      currentLang: language,
    };
    mockedTranslateService.use.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
      ],
      declarations: [
        LanguageSwitcherComponent,
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: mockedTranslateService,
        },
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let mockedTranslateService: Spied<TranslateService>;

  describe('ngOnInit', (): void => {
    beforeEach((async(): Promise<void> => {
      await initializeTestComponent();
    }));

    it('should set component.currentLanguage to english', (): void => {
      expect(component.currentLanguage).toEqual(SupportedLanguages.English);
    });
  });

  describe('changeLanguage', (): void => {
    describe('default config', (): void => {
      beforeEach((async(): Promise<void> => {
        await initializeTestComponent();
      }));

      it('should set component.currentLanguage to english', (): void => {
        component.currentLanguage = SupportedLanguages.Dutch;

        component.changeLanguage();

        expect(component.currentLanguage).toEqual(SupportedLanguages.English);
      });
    });

    describe('extra config', (): void => {
      beforeEach((async(): Promise<void> => {
        await initializeTestComponent(SupportedLanguages.Dutch);
      }));

      it('should set component.currentLanguage to english', (): void => {
        component.currentLanguage = SupportedLanguages.English;

        component.changeLanguage();

        expect(component.currentLanguage).toEqual(SupportedLanguages.Dutch);
      });
    });
  });
});
