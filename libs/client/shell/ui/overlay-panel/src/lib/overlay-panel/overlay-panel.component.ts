import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from '@nestjs/common';
import { BehaviorSubject, combineLatest, filter, forkJoin, map, startWith, Subject } from 'rxjs';
import { OverlayOption } from '../overlay-panel.module';

// TODO: in case this component needs to be more dynamic, we need to remove this:
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
  @Output() itemSelected = new EventEmitter<OverlayOption>();

  filter = new FormControl('');
  filter$ = this.filter.valueChanges.pipe(startWith(''));

  @Input() groupedOptions!: groupedOption[];

  groupedOptions$: BehaviorSubject<groupedOption[]> = new BehaviorSubject<groupedOption[]>([]);

  filteredOptions$ = combineLatest([this.groupedOptions$, this.filter$]).pipe(
    map(([options, filterString]) => {
      if (filterString) {
        if (filterString.length === 1) {
          return options.filter((option) => option.label.includes(filterString));
        } else {
          return options
            .map((option) => {
              const items = option.items.filter((item) => item.label.includes(filterString));
              return {
                ...option,
                items,
              };
            })
            .filter((option) => option.items.length);
        }
      } else {
        return options;
      }
    })
  );

  ngOnInit(): void {
    this.groupedOptions$.next(this.groupedOptions);
  }

  selectItem(item: OverlayOption): void {
    this.itemSelected.next(item);
  }
}
