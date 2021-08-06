import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CollectionsEntity } from '@aymme/client/collections/data-access';

@Component({
  selector: 'ay-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss'],
})
export class CollectionsListComponent implements OnInit {
  @Input() collection: CollectionsEntity | undefined;

  @Output() renameCollection: EventEmitter<{
    collectionId: string;
  }> = new EventEmitter<{ collectionId: string }>();
  @Output() deleteCollection: EventEmitter<{
    collectionId: string;
  }> = new EventEmitter<{ collectionId: string }>();
  @Output() openEndpoint: EventEmitter<{ endpointId: string }> =
    new EventEmitter<{ endpointId: string }>();

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Rename',
            icon: 'pi pi-pencil',
            command: () => {
              if (this.collection?.id) {
                this.renameCollection.emit({
                  collectionId: this.collection.id,
                });
              }
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              if (this.collection?.id) {
                this.deleteCollection.emit({
                  collectionId: this.collection.id,
                });
              }
            },
          },
        ],
      },
    ];
  }
}
