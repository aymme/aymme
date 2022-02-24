import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayOption } from '../overlay-panel.module';

export type groupedOption = {
  label: string;
  items: OverlayOption[];
};

@Component({
  selector: 'ay-overlay-panel',
  templateUrl: './overlay-panel.component.html',
  styleUrls: ['./overlay-panel.component.scss'],
})
export class OverlayPanelComponent implements OnInit {
  @Input() isOpen = false;
  @Input() groupedOptions: groupedOption[] = [];
  @Output() itemSelected = new EventEmitter<OverlayOption>();
  constructor() {}

  ngOnInit(): void {}

  selectItem(item: OverlayOption): void {
    this.itemSelected.next(item);
  }
}
