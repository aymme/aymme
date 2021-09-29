import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from './theme-switcher.service';

@Component({
  selector: 'ay-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  public isDarkTheme = true;

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
