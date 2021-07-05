import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ThemeSwitcherService } from './services/theme-switcher.service';

@Component({
  selector: 'ay-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit {
  public isDarkTheme: boolean = false;

  public constructor(
    private readonly themeSwitcherService: ThemeSwitcherService,
  ) {
  }

  public ngOnInit(): void {
    this.isDarkTheme = this.themeSwitcherService.isDarkTheme;
  }

  public changeTheme(): void {
    this.themeSwitcherService.changeTheme(this.isDarkTheme);
  }
}
