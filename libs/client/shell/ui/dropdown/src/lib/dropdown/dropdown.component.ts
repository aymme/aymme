import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseEntity } from '@aymme/client/mock/model';
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
  @Output() onSelectItem = new EventEmitter<any>();

  showDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggleDropdown(): void {
    this.showDropdown$.next(!this.showDropdown$.value);
  }

  selectItem(item: any): void {
    this.onSelectItem.emit(item);
    this.showDropdown$.next(false);
  }

  hideDropdown(): void {
    this.showDropdown$.next(false);
  }
}
