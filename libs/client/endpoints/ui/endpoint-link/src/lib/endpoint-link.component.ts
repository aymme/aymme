import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { EndpointsEntity } from '@aymme/client/endpoints/data-access';

@Component({
  selector: 'ay-endpoint-link',
  templateUrl: './endpoint-link.component.html',
  styleUrls: ['./endpoint-link.component.scss'],
})
export class EndpointLinkComponent {
  @Input() endpoint: EndpointsEntity | undefined;
  @Output() openEndpoint: EventEmitter<{ endpointId: string }> =
    new EventEmitter<{ endpointId: string }>();

  @HostListener('click')
  onClick() {
    this.openEndpoint.emit({ endpointId: this.endpoint?.id || '' });
  }
}
