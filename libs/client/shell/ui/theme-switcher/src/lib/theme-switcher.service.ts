import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export enum THEMES {
  Light = 'light',
  Dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  private _theme: THEMES = THEMES.Dark;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.initializeTheme();
  }

  public initializeTheme(): void {
    this.theme = localStorage.getItem('theme') === 'light' ? THEMES.Light : THEMES.Dark;
    this.changeTheme(this.theme);
  }

  get theme() {
    return this._theme;
  }

  set theme(theme: THEMES) {
    this._theme = theme;
  }

  public changeTheme(theme: THEMES): void {
    this.removeBodyThemeClass(this.theme);

    localStorage.setItem('theme', `${theme}`);
    this.setBodyThemeClass(theme);
    this.theme = theme;
  }

  private setBodyThemeClass(theme: THEMES): void {
    this.document.documentElement.classList.add(theme.toString());
  }

  private removeBodyThemeClass(theme: THEMES) {
    this.document.documentElement.classList.remove(theme.toString());
  }
}
