import { Component, Input } from '@angular/core';

@Component({
  selector: 'ay-endpoint-link',
  templateUrl: './endpoint-link.component.html',
  styleUrls: ['./endpoint-link.component.css'],
})
export class EndpointLinkComponent {
  @Input() method = '';
  @Input() path = '';
}
