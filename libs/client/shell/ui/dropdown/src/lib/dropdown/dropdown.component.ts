import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ay-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options!: any;
  @Input() selected!: any;
  @Input() optionValue!: any;
  @Output() selectItem = new EventEmitter<any>();

  showDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggleDropdown(): void {
    this.showDropdown$.next(!this.showDropdown$.value);
  }

  select(item: any): void {
    this.selectItem.emit(item);
    this.showDropdown$.next(false);
  }

  hideDropdown(): void {
    this.showDropdown$.next(false);
  }
}
