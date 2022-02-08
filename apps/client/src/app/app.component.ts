import { ThemeSwitcherService } from '@aymme/client/shell/ui/theme-switcher';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ay-root',
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly themeSwitcherService: ThemeSwitcherService
  ) {}

  ngOnInit() {
    this.themeSwitcherService.initializeTheme();
  }
}
