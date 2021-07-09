import { ThemeSwitcherService } from 'libs/client/shell/ui/theme-switcher/src/lib/theme-switcher.service';
import { PrimeNGConfig } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ay-root',
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly primengConfig: PrimeNGConfig,
    private readonly themeSwitcherService: ThemeSwitcherService,
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.themeSwitcherService.initializeTheme();
  }
}
