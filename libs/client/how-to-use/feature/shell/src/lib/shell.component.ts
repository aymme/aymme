import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ay-shell',
  template: '<ng-content></ng-content>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
