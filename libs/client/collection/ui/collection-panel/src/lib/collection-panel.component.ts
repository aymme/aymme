import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionsEntity } from '@aymme/client/collection/data-access';

@Component({
  selector: 'ay-collection-panel',
  templateUrl: './collection-panel.component.html',
  styleUrls: ['./collection-panel.component.scss'],
})
export class CollectionPanelComponent {
  @Input() collection!: CollectionsEntity;
  @Output() selectEndpoint = new EventEmitter();

  test(data: any) {
    // this.selectEndpoint.emit(data);
  }
}
