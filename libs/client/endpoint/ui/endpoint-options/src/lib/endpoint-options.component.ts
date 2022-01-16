import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EndpointEntity, IAvailableStatusCode } from '@aymme/client/mock/model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ay-endpoint-options',
  templateUrl: './endpoint-options.component.html',
  styleUrls: ['./endpoint-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndpointOptionsComponent implements OnInit, OnChanges {
  @Input() availableStatusCodes: IAvailableStatusCode[] | null = [];
  @Input() activeStatusCode: IAvailableStatusCode | null | undefined;
  @Input() endpoint: EndpointEntity | undefined;

  @Output() update = new EventEmitter<Partial<EndpointEntity>>();

  form: FormGroup = this.fb.group({
    delay: null,
    activeStatusCode: null,
    emptyArray: null,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log(this.availableStatusCodes);
  }

  ngOnChanges() {
    if (this.endpoint) {
      this.form.patchValue({
        delay: this.endpoint.delay,
        activeStatusCode: this.activeStatusCode,
        emptyArray: this.endpoint.emptyArray,
      });
    }
  }

  updateEndpoint() {
    this.update.emit({
      ...this.form.value,
      activeStatusCode: this.activeStatusCodeControl.value['statusCode'],
      delay: parseInt(this.delayControl.value, 10),
    });
  }

  get activeStatusCodeControl(): FormControl {
    return this.form.get('activeStatusCode') as FormControl;
  }

  get delayControl(): FormControl {
    return this.form.get('delay') as FormControl;
  }
}
