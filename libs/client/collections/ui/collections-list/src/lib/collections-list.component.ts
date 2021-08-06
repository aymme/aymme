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

  @Output() renameProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter();
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
              this.renameProject.emit();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.deleteProject.emit();
            },
          },
        ],
      },
    ];
  }
}
