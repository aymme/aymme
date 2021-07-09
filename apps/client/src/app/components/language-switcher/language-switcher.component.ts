import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// import { SupportedLanguages } from '@Enums/supported-languages.enum';
// import { environment } from '@Environment';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ay-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  // public currentLanguage: string = SupportedLanguages.English;

  // public constructor(
  //   public readonly translateService: TranslateService,
  // ) {
  // }

  // public ngOnInit(): void {
  //   this.currentLanguage = this.translateService.currentLang;
  // }

  // public changeLanguage(): void {
  //   this.translateService.currentLang !== SupportedLanguages.English
  //     ? this.translateService.use(SupportedLanguages.English)
  //     : this.translateService.use(SupportedLanguages.Dutch);
  //   this.currentLanguage = this.translateService.currentLang;
  // }
}
