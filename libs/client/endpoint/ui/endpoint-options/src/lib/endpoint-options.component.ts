import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

  activeTab$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private fb: FormBuilder) {}

  addNewHeader() {
    this.headersControl.push(
      this.fb.group({
        name: [null, [Validators.required]],
        value: [null, [Validators.required]],
      })
    );
  }

  setActiveStatusCode(activeStatusCode: ResponseEntity | null | undefined) {
    this.activeStatusCode = activeStatusCode;
    this.configurationForm?.patchValue({ activeStatusCode: activeStatusCode?.statusCode });
  }

  setActiveTab(tabNumber: number) {
    this.activeTab$.next(tabNumber);
  }

  get currentTab() {
    return this.activeTab$.value;
  }

  removeExistingHeader(index: number) {
    this.headersControl.removeAt(index);
  }

  get headersControl(): FormArray {
    return this.configurationForm?.get('headers') as FormArray;
  }
}
