import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ay-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.scss'],
})
export class CollectionPanelComponent {
  @Input() name = '';

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Rename',
          icon: 'pi pi-edit',
          command: () => {
            this.update();
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.delete();
          },
        },
      ],
    },
  ];

  update() {
    console.log(`Update ${this.name}`);
  }

  delete() {
    console.log(`Delete ${this.name}`);
  }
}
