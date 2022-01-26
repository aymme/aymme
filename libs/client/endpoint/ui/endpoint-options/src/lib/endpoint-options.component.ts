import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EndpointEntity, IAvailableStatusCode, UpdateEndpointDto } from '@aymme/client/mock/model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  @Output() update = new EventEmitter<UpdateEndpointDto>();

  form: FormGroup = this.fb.group({
    delay: null,
    activeStatusCode: null,
    emptyArray: null,
    headers: this.fb.array([]),
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

      this.headersControl.clear();

      this.endpoint.headers?.forEach((header) =>
        this.headersControl.push(
          this.fb.group({
            name: [header.name, [Validators.required]],
            value: [header.value, [Validators.required]],
          })
        )
      );
    }
  }

  updateEndpoint() {
    this.update.emit({
      ...this.form.value,
      activeStatusCode: this.activeStatusCodeControl.value['statusCode'],
      delay: parseInt(this.delayControl.value, 10),
    });
  }

  addNewHeader() {
    this.headersControl.push(
      this.fb.group({
        name: [null, [Validators.required]],
        value: [null, [Validators.required]],
      })
    );
  }

  removeExistingHeader(index: number) {
    this.headersControl.removeAt(index);
  }

  get activeStatusCodeControl(): FormControl {
    return this.form.get('activeStatusCode') as FormControl;
  }

  get delayControl(): FormControl {
    return this.form.get('delay') as FormControl;
  }

  get headersControl(): FormArray {
    return this.form.get('headers') as FormArray;
  }
}
