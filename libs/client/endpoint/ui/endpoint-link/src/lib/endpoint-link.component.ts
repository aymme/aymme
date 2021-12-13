import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'ay-endpoint-link',
  templateUrl: './endpoint-link.component.html',
  styleUrls: ['./endpoint-link.component.css'],
})
export class EndpointLinkComponent {
  @Input() method = '';
  @Input() path = '';
  @Output() selectEndpoint = new EventEmitter();

  @HostListener('click')
  onClick() {
    console.log('I was clicked');
  }
}
