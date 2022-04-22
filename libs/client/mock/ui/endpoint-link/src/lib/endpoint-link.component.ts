import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

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
  @Output() removeEndpoint = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.selectEndpoint.emit();
  }

  getMethodClass(method: string): string {
    return method ? `method-${method.toLowerCase()}` : '';
  }

  onRemoveEndpoint(ev: Event) {
    this.removeEndpoint.emit();
    ev.stopPropagation();
  }
}
