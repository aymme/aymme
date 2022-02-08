import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService, THEMES } from './theme-switcher.service';

@Component({
  selector: 'ay-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  public theme: THEMES = THEMES.Dark;
  public THEMES = THEMES;

  public constructor(
    private readonly themeSwitcherService: ThemeSwitcherService,
  ) {}

  public ngOnInit(): void {
    this.theme = this.themeSwitcherService.theme;
  }

  public changeTheme(theme: THEMES): void {
    const _theme = theme === THEMES.Dark ? THEMES.Dark : THEMES.Light;
    this.themeSwitcherService.changeTheme(_theme);

    this.theme = _theme;
  }

}
