import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ay-endpoint-options',
  templateUrl: './endpoint-options.component.html',
  styleUrls: ['./endpoint-options.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndpointOptionsComponent {
  @Input() availableStatusCodes: ResponseEntity[] | null = [];
  @Input() activeStatusCode: ResponseEntity | null | undefined;
  @Input() endpoint: EndpointEntity | undefined;

  @Input() configurationForm: FormGroup | undefined;

  constructor(private fb: FormBuilder) {}

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

  get headersControl(): FormArray {
    return this.configurationForm?.get('headers') as FormArray;
  }
}
