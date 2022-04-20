import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'ay-endpoint-link',
  templateUrl: './endpoint-link.component.html',
  styleUrls: ['./endpoint-link.component.scss'],
})
export class EndpointLinkComponent {
  @Input() method = '';
  @Input() path = '';
  @Input() isSelected = false;
  @Output() selectEndpoint = new EventEmitter();
  collection: CollectionsEntity;

  constructor(private collectionsFacade: CollectionsFacade) {
    this.collectionsFacade.allCollections$.pipe(take(1)).subscribe((t) => {
      this.collection = t[0];
    });
  }

  @HostListener('click')
  onClick() {
    this.selectEndpoint.emit();
  }

  getMethodClass(method: string): string {
    return method ? `method-${method.toLowerCase()}` : '';
  }

  removeEndpoint() {
    const endpointId = this.collection?.endpoints?.find((e) => e.path === this.path)?.id;
    if (endpointId) {
      this.collectionsFacade.removeEndpointFromCollection(this.collection.id, endpointId);
    }
  }
}
