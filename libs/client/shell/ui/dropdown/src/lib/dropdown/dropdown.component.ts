import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseEntity } from '@aymme/client/mock/model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ay-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() options!: any;
  @Input() selected!: any;
  @Output() onSelectItem = new EventEmitter<any>();

  selectedItem$: BehaviorSubject<string> = new BehaviorSubject<string>('Select an option');
  showDropdown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    // TODO: make 'statuscode' dynamic
    this.selectedItem$.next(this.selected?.statusCode);
  }

  toggleDropdown(): void {
    this.showDropdown$.next(!this.showDropdown$.value);
  }

  selectItem(item: any): void {
    this.onSelectItem.emit(item);
    // TODO: make 'statuscode' dynamic
    this.selectedItem$.next(item.statusCode);
    this.showDropdown$.next(false);
  }

  hideDropdown(): void {
    console.log('xx');
    this.showDropdown$.next(false);
  }
}
