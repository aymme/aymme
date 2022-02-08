import { Component, Input } from '@angular/core';

@Component({
  selector: 'ay-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.scss'],
})
export class CollectionPanelComponent {
  @Input() name = '';

  update() {
    console.log(`Update ${this.name}`);
  }

  delete() {
    console.log(`Delete ${this.name}`);
  }
}
