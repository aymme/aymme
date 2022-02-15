import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ay-endpoint-link',
  templateUrl: './endpoint-link.component.html',
  styleUrls: ['./endpoint-link.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EndpointLinkComponent {
  @Input() method = '';
  @Input() path = '';
  @Input() isSelected = false;
  @Output() selectEndpoint = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.selectEndpoint.emit();
  }
}
