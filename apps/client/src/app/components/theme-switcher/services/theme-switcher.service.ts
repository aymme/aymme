import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ThemeSwitcherService {
  public set isDarkTheme(isDarkTheme: boolean) {
    this._isDarkTheme = isDarkTheme;
  }

  public get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  private _isDarkTheme: boolean = false;

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  public initializeTheme(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'true';

    this.changeTheme();
  }

  public changeTheme(isDarkTheme: boolean = this.isDarkTheme): void {
    const themeName: string = isDarkTheme ? 'dark' : 'light';
    const themeHref: string = `./assets/themes/${themeName}-blue.css`;
    const head: HTMLHeadElement = this.document.getElementsByTagName('head')[0];
    const themeLink: HTMLLinkElement = <HTMLLinkElement>this.document.getElementById('theme');

    this.isDarkTheme = isDarkTheme;

    if (!!themeLink?.id) {
      themeLink.href = themeHref;
    } else {
      const style: HTMLLinkElement = this.document.createElement('link');

      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${themeHref}`;

      head.appendChild(style);
    }

    localStorage.setItem('theme', `${isDarkTheme}`);

    this.setBodyThemeClass(isDarkTheme);
  }

  private setBodyThemeClass(isDarkTheme: boolean): void {
    const addedClass: string = ThemeSwitcherService.getClassName(isDarkTheme);
    const removedClass: string = ThemeSwitcherService.getClassName(!isDarkTheme);

    this.document.body.classList.add(addedClass);
    this.document.body.classList.remove(removedClass);
  }

  private static getClassName(isDarkTheme: boolean): string {
    return isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}
