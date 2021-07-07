import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ay-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
}
