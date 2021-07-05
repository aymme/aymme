import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { Spied } from '@Specs/types/utils.type';

import { ThemeSwitcherService } from './theme-switcher.service';

describe('ThemeSwitcherService', (): void => {
  let service: ThemeSwitcherService;
  let mockedDocument: Spied<Document>;

  beforeEach((): void => {
    mockedDocument = {
      ...jasmine.createSpyObj(Document, ['getElementsByTagName', 'getElementById', 'createElement']),
      body: {
        classList: {
          add: (): void => { return; },
          remove: (): void => { return; },
        },
      },
    };

    mockedDocument.getElementsByTagName.and.returnValue(
      <HTMLCollectionOf<HTMLHeadElement>><unknown>[{ appendChild: (): void => { return; }}],
    );
    mockedDocument.createElement.and.returnValue(<HTMLLinkElement>{
      id: '',
      rel: '',
      href: '',
    });
    spyOn(localStorage, 'setItem').and.callFake((): void => { return; });

    TestBed.configureTestingModule({
      providers: [
        ThemeSwitcherService,
        { provide: DOCUMENT, useValue: mockedDocument },
      ],
    });
    service = TestBed.inject(ThemeSwitcherService);
  });

  describe('changeTheme', (): void => {
    it('should change theme true', (): void => {
      service.changeTheme(true);

      expect(service.isDarkTheme).toEqual(true);
    });

    it('should change theme to false', (): void => {
      mockedDocument.getElementById.and.returnValue(<HTMLLinkElement>{
        id: 'id',
        rel: '',
        href: '',
      });
      service.changeTheme();

      expect(service.isDarkTheme).toEqual(false);
    });
  });

  describe('initializeTheme', (): void => {
    it('should initialize theme based on localstorage', (): void => {
      const changeThemeSpy: jasmine.Spy<() => void> = spyOn(service, 'changeTheme');

      spyOn(localStorage, 'getItem').and.callFake((): string => 'true');

      service.initializeTheme();

      expect(service.isDarkTheme).toEqual(true);
      expect(changeThemeSpy).toHaveBeenCalledOnceWith();
    });
  });
});
